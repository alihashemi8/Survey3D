from pathlib import Path
from decouple import config
OPENAI_API_KEY = config("OPENAI_API_KEY")
from datetime import timedelta




REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=5),
    "AUTH_HEADER_TYPES": ("Bearer",),
}


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-nsa!f1o7&9i_ftsr=j!cb#*8t4ba6dctloj*lqt@3dloeka3jb'
DEBUG = True
ALLOWED_HOSTS = ['*']  # در توسعه مشکلی نیست

# ------------------------------------------------------
# ✅ اپ‌های نصب‌شده
INSTALLED_APPS = [
    'corsheaders',                   
    'rest_framework',
    'survey',
    'accounts',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# ------------------------------------------------------
# ✅ میدل‌ورها
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',              # ← باید اول باشه
    'django.middleware.common.CommonMiddleware',          # ← بعدش این
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ------------------------------------------------------
# ✅ تنظیمات CORS
CORS_ALLOW_ALL_ORIGINS = False  # امنیتی‌تره
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# در صورت نیاز به ارسال کوکی:
CORS_ALLOW_CREDENTIALS = True

# ------------------------------------------------------
ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ------------------------------------------------------
# دیتابیس پیش‌فرض SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ------------------------------------------------------
# رمزگذاری و ولیدیشن
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------------------------------------------
# تنظیمات بین‌المللی
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ------------------------------------------------------
# فایل‌های استاتیک
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "your_email@gmail.com"
EMAIL_HOST_PASSWORD = "your_app_password"  # نه پسورد معمولی، اپ پسورد

