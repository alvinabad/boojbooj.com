from django.conf.urls.defaults import *

import settings

urlpatterns = patterns('%s.%s.views' % (settings.PROJECT_NAME, settings.HOME_APP),
    (r'^$', 'index'),
)
