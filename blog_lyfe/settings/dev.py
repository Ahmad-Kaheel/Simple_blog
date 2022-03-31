from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-l-_lzjw2btw*&v^v7^fes6h&!#lbl&=4(-%v_i4jgpe-%neygg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# 'aroundtheword.herokuapp.com','127.0.0.1:8000', 'localhost'
ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/' 

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') # for static files collected in django

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')