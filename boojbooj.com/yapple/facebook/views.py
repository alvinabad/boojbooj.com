from django.http import HttpResponse, HttpResponseServerError 
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.template import Context, loader
from django.utils import simplejson

def index(request):
    return HttpResponse("HELLO FACEBOOK APP")