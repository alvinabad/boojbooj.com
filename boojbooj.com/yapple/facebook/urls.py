from django.conf.urls.defaults import *

import settings

views_module = __name__.split('.')
views_module[2] = 'views'
views_module = '.'.join(views_module)

urlpatterns = patterns(views_module,
    (r'^$', 'index'),
    (r'^test$', 'test'),
)
