from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, University, Scholarship, StatisticsData, CoursePlatform, OTP

# ✅ Custom admin for CustomUser
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "first_name", "last_name", "role", "gpa", "university", "is_staff", "is_active")
    list_filter = ("role", "stream", "university", "is_staff", "is_active")
    search_fields = ("username", "email", "first_name", "last_name", "university")
    ordering = ("username",)

    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields": ("role", "gpa", "stream", "university")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Role Information", {"fields": ("role", "gpa", "stream", "university")}),
    )

# ✅ University customization
@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ("name", "state", "stream", "category", "website")
    search_fields = ("name", "state", "stream")
    list_filter = ("state", "category")

# ✅ Scholarship customization
@admin.register(Scholarship)
class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ("name", "amount", "link")
    search_fields = ("name", "eligibility")
    list_filter = ("amount",)

# ✅ Statistics (simple, JSONField)
@admin.register(StatisticsData)
class StatisticsAdmin(admin.ModelAdmin):
    list_display = ("id", "data")

# ✅ CoursePlatform customization
@admin.register(CoursePlatform)
class CoursePlatformAdmin(admin.ModelAdmin):
    list_display = ("name", "url")
    search_fields = ("name", "description")

# ✅ OTP (for debugging login)
@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ("email", "code", "created_at")
    search_fields = ("email",)
    list_filter = ("created_at",)
