# Django settings for yapple project.

DEBUG = True
TEMPLATE_DEBUG = DEBUG

#------------------------------------------------------------------------------
# Yapple Settings
import os, sys
HOME_PATH = os.path.dirname(__file__)
#------------------------------------------------------------------------------

ADMINS = (
    # ('Your Name', 'your_email@domain.com'),
)

MANAGERS = ADMINS

DATABASE_ENGINE = ''           # 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
DATABASE_NAME = ''             # Or path to database file if using sqlite3.
DATABASE_USER = ''             # Not used with sqlite3.
DATABASE_PASSWORD = ''         # Not used with sqlite3.
DATABASE_HOST = ''             # Set to empty string for localhost. Not used with sqlite3.
DATABASE_PORT = ''             # Set to empty string for default. Not used with sqlite3.

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
#TIME_ZONE = 'America/Chicago'
TIME_ZONE = 'America/Los_Angeles'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = ''

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/media/'

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'secret'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.load_template_source',
    'django.template.loaders.app_directories.load_template_source',
#     'django.template.loaders.eggs.load_template_source',
)

MIDDLEWARE_CLASSES = (
    #'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.middleware.cache.FetchFromCacheMiddleware',
    #'facebook.djangofb.FacebookMiddleware',
)

ROOT_URLCONF = 'yapple.urls'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    HOME_PATH,
    os.path.join(HOME_PATH, 'templates'),
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    #'yapple.fbapp',
)

#CACHE_BACKEND = "db://cache_table"
#CACHE_BACKEND = 'memcached://127.0.0.1:11211/'
#CACHE_MIDDLEWARE_SECONDS = "60"
#CACHE_MIDDLEWARE_KEY_PREFIX


#------------------------------------------------------------------------------
# Yapple Settings
#------------------------------------------------------------------------------
PROJECT_NAME = "yapple"
HOME_APP = "home"
VIDEO_APP = "video"

JAVASCRIPT_PATH = os.path.join(HOME_PATH, 'static', 'scripts')
CSS_PATH = os.path.join(HOME_PATH, 'static', 'styles')
IMAGES_PATH = os.path.join(HOME_PATH, 'static', 'images')
STATIC_PATH = os.path.join(HOME_PATH, 'static')

JAVASCRIPT_SRC = ("http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js",
                  "/static/scripts/sprintf.js",
                  "/static/scripts/chat.js",
                  "/static/scripts/twitter.js",
                  "http://www.google.com/jsapi",
                  "/static/scripts/youtube.js",
                  )

CSS_SRC = ("/static/styles/video.css",
           )

#DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=ip1zsUIosoA"   # Journey
DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=oobDQ0vdm8M"  # GnR
DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=-SlWIaYkFI4"  # MJ Billie Jean
DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=p2nTSbHfJvk"  # MJ Billie Jean
DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=TjLCJKoot4U"  # Bear vs Cougar

#DEFAULT_YOUTUBE_URL = "http://www.youtube.com/watch?v=kPQR-OsH0RQ"  # Nirvana
#DEFAULT_YOUTUBE_URL = http://www.youtube.com/watch?v=jJOzdLwvTHA

YOU_TUBE_URLS = [ "http://www.youtube.com/watch?v=ip1zsUIosoA", # Journey, Don't Stop...
                  "http://www.youtube.com/watch?v=oobDQ0vdm8M", # GnR, Sweet Child...
                  "http://www.youtube.com/watch?v=kPQR-OsH0RQ", # Nirvana, Smells... 
                  "http://www.youtube.com/watch?v=jJOzdLwvTHA", # Ingrid, The Way I am
                  "http://www.youtube.com/watch?v=hKUBTX9kKEo", # The Who, Baba O'Riley
                  "http://www.youtube.com/watch?v=i0XknwXqLDo", # The Who, My Generation
                  "http://www.youtube.com/watch?v=l_FZVD5lsAw", # The Who, Who are you
                  "http://www.youtube.com/watch?v=xtXN_EHPwSg", # GnR, Welcome to the jungle
                  "http://www.youtube.com/watch?v=tYE3vWbhAQI", # Nirvana, come as you are
                 ]


YOU_TUBE_URLS = [ "http://www.youtube.com/watch?v=BDlLBuVWgiw", # LOL
                  "http://www.youtube.com/watch?v=4N3N1MlvVc4", # Gary Jules
                  "http://www.youtube.com/watch?v=7Q25-S7jzgs", # Larry Lessig
                  "http://www.youtube.com/watch?v=7jx0dTYUO5E", # Mary Roach
                  "http://www.youtube.com/watch?v=iP9QF_lBOyA", # Ray Anderson
                  "http://www.youtube.com/watch?v=9X68dm92HVI", # Dan Ariel
                  "http://www.youtube.com/watch?v=64-bHvDcgQQ", # Felix Dennis
                  "http://www.youtube.com/watch?v=VxGMqKCcN6A", #Richard Dawkins
                  "http://www.youtube.com/watch?v=tsgvhP07BC8", # Bill Gates
                  "http://www.youtube.com/watch?v=xjBIsp8mS-c", # Stephen Hawking
                  "http://www.youtube.com/watch?v=d3B541KM3q4", # Al Gore
                  "http://www.youtube.com/watch?v=kPQR-OsH0RQ", # Nirvana, Smells... 
                 ]

USER_IDLE_TIMOUT = 300
MESSAGE_LIMIT = 50 

LOG_LEVEL = "DEBUG"

# Developer keys using http://test.yapple.yaploud.com:8000/account/twitter_callback
# Edit your etc/hosts file to point this domainname to your localhost IP
TWITTER_CONSUMER_KEY = "secret"
TWITTER_CONSUMER_SECRET = "secret"

# Google OAuth keys for http://test.yapple.yaploud.com/
GOOGLE_CONSUMER_KEY = "test.yapple.yaploud.com"
GOOGLE_CONSUMER_SECRET = "secret"

INFO = {
          "DISABLE_THIS": False,
          "HELLO": "ALVIN",
          "title": "Boojbooj",
        }

#FEEDS = {
#    'latest': LatestEntries,
#    'categories': LatestEntriesByCategory,
#}

#------------------------------------------------------------------------------
# To override the settings above for your sandbox development,
# create local/settings.py
LOCAL_SETTINGS_MODULE = os.path.join(HOME_PATH, "local/settings.py")
if os.path.exists(LOCAL_SETTINGS_MODULE):
    try:
        execfile(LOCAL_SETTINGS_MODULE)
    except Exception, e:
        print e
#------------------------------------------------------------------------------

FACEBOOK_API_KEY = "secret"
FACEBOOK_SECRET_KEY = "secret"


