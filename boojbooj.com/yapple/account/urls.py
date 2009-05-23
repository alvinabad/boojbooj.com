from django.conf.urls.defaults import *

import settings

urlpatterns = patterns('%s.account.views' % settings.PROJECT_NAME,
    (r'^$', 'index'),
    (r'^login$', 'login'),
    (r'^logout$', 'logout'),
    (r'^loginFailed$', 'loginFailed'),
    (r'^twitter_callback$', 'twitter_callback'),
    (r'^google_callback$', 'google_callback'),
    (r'^twitter_auth$', 'twitter_auth'),
    (r'^google_auth$', 'google_auth'),
    (r'^youtube_auth$', 'youtube_auth'),
)
#    (r'^getUserInfo$', 'getUserInfo'),
#    (r'^get_friends$', 'get_friends'),
#    (r'^getFollowers$', 'getFollowers'),
