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

def index(request):
    info = settings.INFO
    
    #video_url = settings.DEFAULT_YOUTUBE_URL
    video_url = random.choice(settings.YOU_TUBE_URLS)
    
    try:
        video_url = request.REQUEST['video_url']
    except:
        pass
        
    video_id = None
    try:
        m = re.match(".*\?v=([A-Za-z0-9_-]+)", video_url)
        video_id = m.groups()[0]
    except:
        try:
            m = re.match(".*\/v\/([A-Za-z0-9_-]+)", video_url)
            video_id = m.groups()[0]
        except:
            pass
        
    vm = VideoMessages()       
    #info['video_urls'] = vm.getVideoUrls()
    info['video_urls'] = vm.getVideos()
    info['message'] = "Add comments to your favorite YouTube videos"
    info['video_url'] = video_url  
    info['video_id'] = video_id  
    info['javascript_src'] = settings.JAVASCRIPT_SRC
    info['css_src'] = settings.CSS_SRC
    #info['full_path'] = request.path;
    info['full_path'] = request.get_full_path()
    
    try:
        request.session['username'] = settings.USERNAME
    except:
        pass
    
    try:
        info['username'] = request.session['username']
    except:
        pass
        
    try:
        info['twitter_username'] = request.session['twitter_username']
    except:
        pass
        
    request.session['previous_url'] = request.get_full_path();
        
    #template = os.path.join(settings.HOME_PATH, 'video', 'video_t.html')
    template = os.path.join(settings.HOME_PATH, 'templates', 'home.html')
    t = loader.get_template(template)
    c = Context({"info": info})
    return HttpResponse(t.render(c))

def sendMessage(request):
    sent_message = {}
    info = {}
    
    # Get request parameters
    try:
        sent_message['video_id'] = request.REQUEST['video_id']
        sent_message['postedby'] = request.REQUEST['postedby']
        sent_message['message'] = request.REQUEST['message']
        sent_message['current_time'] = request.REQUEST['current_time']
        sent_message['last_record'] = request.REQUEST['last_record']
    except:
        return HttpResponseForbidden("Unauthorized access!")

    try:
        sent_message['owner'] = request.REQUEST['owner']
    except:
        sent_message['owner'] = None
        
    vm = VideoMessages()       
    messages = []
    try:
        vm.saveMessage(sent_message)
    except Exception, e:
        log.info("Error saving VideoMessages: %s" % e)
        return HttpResponseServerError("Server Error!")
    
    try:
        info['messages'] = vm.getMessages(video_id=sent_message['video_id'],
                               last_record=sent_message['last_record'],
                               current_time=sent_message['current_time'])
    except Exception, e:
        log.info("Error retrieving VideoMessages: %s" % e)
        return HttpResponseServerError("Server Error!")
    
    info['last_record'] = sent_message['current_time']
    info['video_id'] = sent_message['video_id']
    info['postedby'] = sent_message['postedby']
    
    json_data = simplejson.dumps(info)
    response = HttpResponse(json_data)
    return response

def getMessages(request, message_id=None):
    info = {}
    try:
        current_time = request.REQUEST['current_time']
        video_id = request.REQUEST['video_id']
        last_record = request.REQUEST['last_record']
    except:
        return HttpResponseForbidden("Unauthorized access!")
    
    vm = VideoMessages()
    try:
        info['messages'] = vm.getMessages(video_id=video_id,
                             last_record=last_record, current_time=current_time)
    except Exception, e:
        log.info("Error retrieving VideoMessages: %s" % e)
        return HttpResponseServerError("Server Error!")
    
    info['last_record'] = current_time
    info['video_id'] = video_id
    json_data = simplejson.dumps(info)
    response = HttpResponse(json_data)
    return response

def test(request):
    log.debug("TEST")
        
    vm = VideoMessages()
    for x in vm.getVideoUrls():
        print x
        
    info = {}
    info['message'] = "Watch and Chat"
    info.update(settings.INFO)
    
    template = os.path.join(settings.HOME_PATH, 'video', 'test_t.html')
    t = loader.get_template(template)
    c = Context({"info": info})
    return HttpResponse(t.render(c))


