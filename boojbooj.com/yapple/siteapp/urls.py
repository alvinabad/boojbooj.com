from django.conf.urls.defaults import *

import settings

urlpatterns = patterns('%s.siteapp.views' % settings.PROJECT_NAME,
    (r'^$', 'index'),
    (r'^terms/$', 'terms'),
    (r'^privacy/$', 'privacy'),
    (r'^blog/$', 'blog'),
    (r'^contact/$', 'contact'),
    (r'^about/$', 'about'),
)
