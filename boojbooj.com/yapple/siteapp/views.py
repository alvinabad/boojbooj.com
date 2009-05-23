from django.http import HttpResponse, HttpResponseServerError 
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.template import Context, loader
from django.utils import simplejson
from django.shortcuts import render_to_response

import settings

def index(request):
    return HttpResponseRedirect("/")

def about(request):
    return render_to_response("siteapp/about.html")

def terms(request):
    return HttpResponseRedirect("/static/docs/Terms_of_Use.pdf")

def privacy(request):
    return HttpResponseRedirect("/static/docs/Privacy_Policy.pdf")

def contact(request):
    return render_to_response('siteapp/contact.html')

def blog(request):
    return HttpResponseRedirect("http://boojbooj.wordpress.com/")