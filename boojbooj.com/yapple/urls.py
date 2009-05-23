from django.conf.urls.defaults import *
#from myproject.feeds import LatestEntries, LatestEntriesByCategory

import settings
#feeds = settings.FEEDS

urlpatterns = patterns('',
    (r'', include('%s.%s.urls' % (settings.PROJECT_NAME, settings.HOME_APP))),
    (r'^%s/' % settings.VIDEO_APP,
          include('%s.%s.urls' %  (settings.PROJECT_NAME, settings.VIDEO_APP))),
    (r'^account/', include('%s.account.urls' % settings.PROJECT_NAME)),
    (r'^yt/', include('%s.yt.urls' % settings.PROJECT_NAME)),
    (r'^site/', include('%s.siteapp.urls' % settings.PROJECT_NAME)),

    (r'^(?P<username>[A-Za-z0-9_-]+:{0,2}[A-Za-z0-9_-]+)$',
                            '%s.account.views.user' % settings.PROJECT_NAME),
    #(r'^facebook/', include('yapple.fbapp.urls')),
    
    (r'^scripts/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.JAVASCRIPT_PATH}),
    (r'^styles/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.CSS_PATH}),
    (r'^images/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.IMAGES_PATH}),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_PATH}),
)

#    (r'^feeds/(?P<url>.*)/$', 
#                 'django.contrib.syndication.views.feed', {'feed_dict': feeds}),

