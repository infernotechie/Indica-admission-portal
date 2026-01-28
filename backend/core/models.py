from django.db import models
from django.contrib.auth.models import AbstractUser
import random
from datetime import timedelta
from django.utils import timezone

class University(models.Model):
    name = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    category = models.CharField(max_length=50)  
    website = models.URLField(max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name

class Scholarship(models.Model):
    name = models.CharField(max_length=200)
    eligibility = models.TextField()
    amount = models.CharField(max_length=100)
    link = models.URLField(max_length=500, blank=True, null=True) 

    def __str__(self):
        return self.name

class StatisticsData(models.Model):
    data = models.JSONField()

    def __str__(self):
        return "Statistics Data"
    
class CoursePlatform(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=500)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=(('student', 'Student'), ('teacher', 'Teacher')))

    gpa = models.FloatField(null=True, blank=True)
    stream = models.CharField(max_length=100, null=True, blank=True)
    university = models.CharField(max_length=255, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class OTP(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f'{self.email} - {self.code}'