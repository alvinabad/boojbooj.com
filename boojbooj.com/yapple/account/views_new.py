from django.http import HttpResponse, HttpResponseServerError 
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.template import Context, loader
from django.shortcuts import render_to_response

from django.utils import simplejson
import httplib, time, datetime
import settings
from utils import logger
log = logger.log

from auth import oauth
from auth import TwitterOauth
from service.TwitterService import TwitterService

def index(request):
    return HttpResponse("account/index")

def login(request):
    info = {}
    info['title'] = "YapLoud Login"
    return render_to_response('templates/login.html', {'info': info})

def logout(request):
    try:
        previous_url = request.REQUEST['prev_url']
    except:
        previous_url = "/"
        
    request.session.clear()
    
    response = HttpResponseRedirect(previous_url)
    return response

def twitter_auth(request):
    try:
        request.session['previous_url'] = request.REQUEST['prev_url']
    except:
        pass
    
    token = TwitterOauth.get_unauthorised_request_token()
    print "XXXXXXXXXXXXXXXXXXXXXXXXXXXX:", token
    auth_url = TwitterOauth.get_authorisation_url(token)
    
    request.session['twitter_unauthed_token'] = token.to_string()   
    response = HttpResponseRedirect(auth_url)
    return response

def loginFailed(request):
    info = {}
    info['title'] = "YapLoud Login"
    return render_to_response('templates/loginFailed.html', {'info': info})
    
def twitter_callback(request):
    try:
        previous_url = request.session['previous_url']
    except:
        previous_url = None
        
    unauthed_token = request.session.get('twitter_unauthed_token', None)
    if not unauthed_token:
        #return HttpResponse("No un-authed token cookie")
        if previous_url is None:
            return HttpResponseRedirect("/account/loginFailed")
        else:
            return HttpResponseRedirect("/account/loginFailed?%s" % previous_url)
    
    token = oauth.OAuthToken.from_string(unauthed_token)   
    if token.key != request.GET.get('oauth_token', 'no-token'):
        #return HttpResponse("Something went wrong! Tokens do not match")
        if previous_url is None:
            return HttpResponseRedirect("/account/loginFailed")
        else:
            return HttpResponseRedirect("/account/loginFailed?%s" % previous_url)
    
    access_token = TwitterOauth.exchange_request_token_for_access_token(token)
    request.session['twitter_access_token'] = access_token.to_string()
    
    tw = TwitterService(access_token)
    request.session['twitter_name'] = tw.getUserInfo(key="screen_name")
    
    if previous_url is None:
        previous_url = "/"
        
    response = HttpResponseRedirect(previous_url)
    return response

def getFollowers(request):
    users = []
    
    access_token = request.session.get('twitter_access_token', None)
    if not access_token:
        return HttpResponseRedirect("/account/loginFailed")
        #return HttpResponse("You need an access token!")
    
    token = oauth.OAuthToken.from_string(access_token)   
    
    tw = TwitterService(token)
    auth = tw.is_authenticated()
    
    if auth:
        followers = tw.getFollowers(token)
        json = simplejson.dumps(followers)

    return HttpResponse(json)
    
def get_friends(request):
    users = []
    
    access_token = request.session.get('twitter_access_token', None)
    if not access_token:
        return HttpResponseRedirect("/account/loginFailed")
    
    token = oauth.OAuthToken.from_string(access_token)   
    
    tw = TwitterService(token)
    auth = tw.is_authenticated()
    
    if auth:
        creds = auth
        name = creds.get('name', creds['screen_name']) # Get the name
        
        # Get number of friends. The API only returns 100 results per page,
        # so we might need to divide the queries up.
        friends_count = str(creds.get('friends_count', '100'))
        pages = int( (int(friends_count)/100) ) + 1
        pages = min(pages, 10) # We only want to make ten queries
        
        for page in range(pages):
            #friends = TwitterOauth.get_friends(token, page+1)
            friends = tw.get_friends(page+1)
            users.extend(friends)
            
        json = simplejson.dumps(users)

    return HttpResponse(json)

def getUserInfo(request):
    try:
        key = request.REQUEST['key']
    except:
        key = None
        
    access_token = request.session.get('twitter_access_token', None)
    if not access_token:
        return HttpResponseRedirect("/account/loginFailed")
    
    token = oauth.OAuthToken.from_string(access_token)   
    tw = TwitterService(token)
    
    screen_name = tw.getUserInfo(key="screen_name")
    request.session['twitter_name'] = tw.getUserInfo(key="screen_name")
    info = tw.getUserTimeline(screen_name="alvinabad")
    
    return HttpResponse(info)


