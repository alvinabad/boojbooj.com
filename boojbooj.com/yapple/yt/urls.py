from django.conf.urls.defaults import *

import settings

urlpatterns = patterns('%s.yt.views' % settings.PROJECT_NAME,
    (r'^(?P<video_id>[A-Za-z0-9_-]+)$', 'video'),
)
