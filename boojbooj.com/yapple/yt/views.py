from django.http import HttpResponse, HttpResponseServerError 
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.template import Context, loader
from django.utils import simplejson

import os
import settings
import random
import re

from video.VideoMessages import VideoMessages
from utils import logger
log = logger.log

from auth import oauthtwitter

def video_deprecated(request, video_id=None):
    info = {}
    info.update(settings.INFO)
    
    video_url = ""   #random.choice(settings.YOU_TUBE_URLS)
    
    vm = VideoMessages()       
    info['video_urls'] = vm.getVideos()
    info['message'] = "Add comments to your favorite YouTube videos"
    info['video_url'] = video_url  
    info['video_id'] = video_id  
    info['javascript_src'] = settings.JAVASCRIPT_SRC
    info['css_src'] = settings.CSS_SRC
    info['full_path'] = request.get_full_path()
    
    print "XXXXXXXXXXXXXXXXXXXXXXXXXXXX:", video_url, video_id
    
    try:
        info['username'] = request.session['username']
    except:
        pass
        
    try:
        info['twitter_username'] = request.session['twitter_username']
    except:
        pass
        
    request.session['previous_url'] = request.get_full_path();
        
    template = os.path.join(settings.HOME_PATH, 'templates', 'home.html')
    t = loader.get_template(template)
    c = Context({"info": info})
    return HttpResponse(t.render(c))

