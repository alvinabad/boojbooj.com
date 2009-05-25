from django.conf.urls.defaults import *
#from myproject.feeds import LatestEntries, LatestEntriesByCategory

import settings
#feeds = settings.FEEDS
views_module = __name__.split('.')
project_name = __name__.split('.')[0]

urlpatterns = patterns('',
    #(r'', include('%s.home.urls' % project_name)),
    (r'', include('%s.video.urls' %  project_name)),
    (r'^video/', include('%s.video.urls' %  project_name)),
    (r'^account/', include('%s.account.urls' % project_name)),
    #(r'^yt/', include('%s.yt.urls' % project_name)),
    (r'^yt/', include('%s.video.urls' %  project_name)),
    (r'^site/', include('%s.siteapp.urls' % project_name)),

    (r'^(?P<username>[A-Za-z0-9_-]+:{0,2}[A-Za-z0-9_-]+)$',
                            '%s.account.views.user' % project_name),
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

