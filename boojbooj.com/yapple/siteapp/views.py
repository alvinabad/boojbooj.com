from django.http import HttpResponse, HttpResponseServerError 
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.template import Context, loader
from django.utils import simplejson
from django.shortcuts import render_to_response
import os

import settings

def index(request):
    return HttpResponseRedirect("/")

def about(request):
    info = {}
    info.update(settings.INFO)
    
    info['full_path'] = request.get_full_path()
    
    try:
        info['username'] = request.session['username']
    except:
        pass
        
    try:
        info['twitter_username'] = request.session['twitter_username']
    except:
        pass
    
    request.session['previous_url'] = request.get_full_path();
        
    template = os.path.join(settings.HOME_PATH, 'siteapp', 'about.html')
    t = loader.get_template(template)
    c = Context({"info": info})
    return HttpResponse(t.render(c))

def terms(request):
    return HttpResponseRedirect("/static/docs/Terms_of_Use.pdf")

def privacy(request):
    return HttpResponseRedirect("/static/docs/Privacy_Policy.pdf")

def contact(request):
    info = {}
    info.update(settings.INFO)
    
    info['full_path'] = request.get_full_path()
    
    try:
        info['username'] = request.session['username']
    except:
        pass
        
    try:
        info['twitter_username'] = request.session['twitter_username']
    except:
        pass
    
    request.session['previous_url'] = request.get_full_path();
        
    template = os.path.join(settings.HOME_PATH, 'siteapp', 'contact.html')
    t = loader.get_template(template)
    c = Context({"info": info})
    return HttpResponse(t.render(c))

def blog(request):
    return HttpResponseRedirect("http://boojbooj.wordpress.com/")