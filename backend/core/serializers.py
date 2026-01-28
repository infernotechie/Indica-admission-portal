from rest_framework import serializers
from .models import University, Scholarship, StatisticsData, CoursePlatform
from .models import CustomUser

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'  # now includes website

class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'eligibility', 'amount', 'link']  # ✅ Added 'link'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatisticsData
        fields = '__all__'

class CoursePlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePlatform
        fields = ['id', 'name', 'url', 'description']

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()  # Step 1: Add this field

    class Meta:
        model = CustomUser
        fields = [
            'id','name','email','role','gpa','stream','university',
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()  # Step 2: Combine first + last