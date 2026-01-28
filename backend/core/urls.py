from django.contrib import admin
from django.urls import path
from core.views import (
    UniversityListAPIView,
    ScholarshipListAPIView,
    StatisticListAPIView,
    CoursePlatformListAPIView,
    send_otp,
    verify_otp,
    whoami,
    profile_view,
    chatbot_view,
    logout_view
)
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # University, Scholarship, Statistics, Courses
    path('api/universities/', UniversityListAPIView.as_view(), name='university-list'),
    path('api/scholarships/', ScholarshipListAPIView.as_view(), name='scholarship-list'),
    path('api/statistics/', StatisticListAPIView.as_view(), name='statistics-list'),
    path('api/courses/', CoursePlatformListAPIView.as_view(), name='courseplatform-list'),

    # OTP Login
    path('api/send-otp/', send_otp, name='send_otp'),
    path('api/verify-otp/', verify_otp, name='verify_otp'),

    # User info & profile
    path('api/whoami/', whoami, name='whoami'),
    path('api/profile/', profile_view, name='profile'),

    # Logout
    path('api/logout/', logout_view, name='logout'),

    # Chatbot & Chat history
    path('api/chatbot/', chatbot_view, name='chatbot'),
]
