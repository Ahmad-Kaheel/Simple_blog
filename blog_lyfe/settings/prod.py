import django_on_heroku
from decouple import config

from .base import *


SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['aroundtheword.herokuapp.com']



#------------------------------------AWS S3 --------------------------------------------

# Amazon S3 settings, link of docs :
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html

# Note that usign config makes it more secure 

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')

AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')

AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')

# The link we will use to send and recieve data from 
AWS_S3_CUSTOM_DOMAIN  = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com' 

AWS_DEFAULT_ACL = 'public-read' # To make images and other media public 

AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400'
}

AWS_LOCATION = 'static' #(optional: default is ‘’) A path prefix that will be prepended to all uploads

AWS_QUERYSTRING_AUTH = False # Put it to false because our bucket is public 

AWS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
}

# To upload files into AWS S3 instead of heroku
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

#To allow django-admin collectstatic to automatically put your static files in your bucket
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'

MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

#---------------------------------Heroku logging-----------------------------------------
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s: %(lineno)s] %(message)s",
            'datefmt': "%d-%b-%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'MYAPP': {
            'handlers': ['console'],
            'level': 'DEBUG',
        }
    }
}


#------------------------Heroku settings--------------------------------------------
django_on_heroku.settings(locals())
del DATABASES['default']['options']['sslmode'] # To remove all mistakes in database 
