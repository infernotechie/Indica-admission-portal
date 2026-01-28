from rest_framework import generics
from .models import University, Scholarship, StatisticsData, OTP
from .serializers import UniversitySerializer, ScholarshipSerializer, StatisticSerializer
from django.core.mail import send_mail
from django.contrib.auth import get_user_model, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random
import json
from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from rest_framework.generics import ListAPIView
from .models import CoursePlatform
from .serializers import CoursePlatformSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .serializers import UserSerializer
from django.contrib.auth import logout
import requests
import json
import os
from django.contrib.auth.models import Group

class UniversityListAPIView(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class ScholarshipListAPIView(generics.ListAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

class StatisticListAPIView(generics.ListAPIView):
    queryset = StatisticsData.objects.all()
    serializer_class = StatisticSerializer

class CoursePlatformListAPIView(ListAPIView):
    queryset = CoursePlatform.objects.all()
    serializer_class = CoursePlatformSerializer

def generate_or_resend_otp(email):
    existing_otp = OTP.objects.filter(email=email, created_at__gte=timezone.now() - timedelta(minutes=5)).first()

    if existing_otp:
        code = existing_otp.code
    else:
        code = f"{random.randint(100000, 999999)}"
        OTP.objects.create(email=email, code=code)

    send_mail(
        subject='Your OTP for Indica Login',
        message=f'Your OTP is: {code}. It is valid for 5 minutes.',
        from_email='noreply@indica.com',
        recipient_list=[email],
        fail_silently=False,
    )
    return code

@csrf_exempt
def send_otp(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        role = data.get('role')

        if not email or not role:
            return JsonResponse({'error': 'Email and role are required'}, status=400)

        if '@' not in email or '.' not in email.split('@')[-1]:
            return JsonResponse({'error': 'Invalid email format'}, status=400)

        generate_or_resend_otp(email)

        User = get_user_model()
        user, created = User.objects.get_or_create(email=email)

        user.username = email.split('@')[0]
        user.role = role
        user.save()

        return JsonResponse({'message': 'OTP sent successfully'})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def verify_otp(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        code = data.get('otp')

        if not email or not code:
            return JsonResponse({'error': 'Email and OTP required'}, status=400)

        valid_time = timezone.now() - timedelta(minutes=5)
        otp_obj = OTP.objects.filter(email=email, code=code, created_at__gte=valid_time).first()

        if otp_obj:
            User = get_user_model()
            user = User.objects.get(email=email)
            login(request, user)

            return JsonResponse({
                'message': 'OTP verified successfully',
                'email': user.email,
                'role': user.role,
                'username': user.username,
                'redirect': '/'
            })
        else:
            return JsonResponse({'error': 'Invalid or expired OTP'}, status=400)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def whoami(request):
    if request.user.is_authenticated:
        return Response({
            'user': request.user.username,
            'authenticated': True,
            'role': request.user.role,
            'gpa': request.user.gpa,  
            'email': request.user.email,  
        })
    else:
        return Response({
            'user': 'AnonymousUser',
            'authenticated': False,
            'role': None,
            'gpa': None
        })

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """
    GET: Returns the logged-in user's profile
    PUT/PATCH: Updates name, gpa, stream, university
    """
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        data = request.data

        name = data.get('name')
        if name:
            parts = name.strip().split(' ', 1)
            user.first_name = parts[0]
            user.last_name = parts[1] if len(parts) > 1 else ''

        gpa = data.get('gpa')
        if gpa is not None:
            try:
                gpa = float(gpa)
                if gpa < 0 or gpa > 10:
                    return Response({'error': 'GPA must be between 0 and 10'}, status=400)
                user.gpa = gpa
            except ValueError:
                return Response({'error': 'Invalid GPA format'}, status=400)

        stream = data.get('stream')
        if stream is not None:
            user.stream = stream

        university = data.get('university')
        if university is not None:
            user.university = university

        user.save()

        serializer = UserSerializer(user)
        return Response({
            'message': 'Profile updated successfully',
            'profile': serializer.data
        })

@csrf_exempt
def logout_view(request):
    """Logs out the user and clears the session"""
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logged out successfully"})
    return JsonResponse({"error": "Only POST method allowed"}, status=405)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  

@csrf_exempt
def chatbot_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)

    try:
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        if not user_message:
            return JsonResponse({"error": "Message required"}, status=400)

        user = request.user

        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        if not GOOGLE_API_KEY:
            return JsonResponse({"error": "Google API key not set"}, status=500)

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": user_message}]}],
            "generationConfig": {"temperature": 0.7, "maxOutputTokens": 300}
        }

        bot_reply = "Sorry, I couldn't understand that."  

        try:
            response = requests.post(url, headers=headers, json=payload, timeout=10)
            resp_json = response.json()
            print("Google API response:", resp_json) 

            candidates = resp_json.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                parts = content.get("parts", [])
                if parts:
                    bot_reply = parts[0].get("text", bot_reply)
        except Exception as api_err:
            print("Google API call failed:", api_err)

        return JsonResponse({"reply": bot_reply})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)