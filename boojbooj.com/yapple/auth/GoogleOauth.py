from auth import oauth
import httplib, time, datetime
from django.utils import simplejson

from django.http import *
from django.conf import settings
from django.shortcuts import render_to_response

from utils import logger
log = logger.log

OAUTH_SERVER = 'www.google.com'
OAUTH_REQUEST_TOKEN_URL = 'https://www.google.com/accounts/OAuthGetRequestToken'
OAUTH_ACCESS_TOKEN_URL = 'https://www.google.com/accounts/OAuthGetRequestToken'
OAUTH_AUTHORIZATION_URL = 'https://www.google.com/accounts/OAuthAuthorizeToken'
#SCOPE = "http://www.google.com/base/feeds/"
#SCOPE = "http://gdata.youtube.com"
#SCOPE = "https://mail.google.com/mail/feed/atom/"
#SCOPE = "http://www.google.com/m8/feeds/"
#SCOPE = "http://www.google.com/books/feeds/"
#SCOPE = "https://mail.google.com/mail/feed/atom/ http://www.google.com/m8/feeds/ http://www.google.com/books/feeds/" 
#SCOPE = "http://finance.google.com/finance/feeds/"
#SCOPE = "http://www.blogger.com/feeds/"
SCOPE = "http://www.google.com/calendar/feeds/"

CONSUMER_KEY = settings.GOOGLE_CONSUMER_KEY
CONSUMER_SECRET = settings.GOOGLE_CONSUMER_SECRET

connection = httplib.HTTPSConnection(OAUTH_SERVER)
consumer = oauth.OAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET)
signature_method = oauth.OAuthSignatureMethod_HMAC_SHA1()

# Shortcut around oauth.OauthRequest
def request(url, access_token, parameters=None):
    """
    usage: request( '/url/', your_access_token, parameters=dict() )
    Returns a OAuthRequest object
    """
    log.debug("request url: %s" % url)
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, 
                                                    token=access_token, 
                                                    http_url=url, 
                                                    parameters=parameters)
    oauth_request.sign_request(signature_method, consumer, access_token)
    
    return oauth_request


def fetch_response(oauth_request, connection):
    url = oauth_request.to_url()
    connection.request(oauth_request.http_method, url)
        
    response = connection.getresponse()
    s = response.read()
    return s

def get_unauthorised_request_token(scope=None):
    if scope is None:
        parameters = dict({'scope': SCOPE})
    else:
        parameters = dict({'scope': scope})
    
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
                                        consumer,
                                        http_url=OAUTH_REQUEST_TOKEN_URL,
                                        parameters=parameters)
    oauth_request.sign_request(signature_method, consumer, None)
    resp = fetch_response(oauth_request, connection)
    
    log.debug("get_unauthorised_request_token: %s" % resp)
    try:
        token = oauth.OAuthToken.from_string(resp)
    except Exception, e:
        log.debug("Request for token failed: %s" % resp)
        token = None
        
    return token


def get_authorisation_url(token, callback_url=None):
    if callback_url is None:
        parameters = None
    else:
        parameters = dict(oauth_callback=callback_url)
        
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
                                        consumer, 
                                        token=token, 
                                        http_url=OAUTH_AUTHORIZATION_URL,
                                        parameters=parameters)
    oauth_request.sign_request(signature_method, consumer, token)
    oauth_request_url = oauth_request.to_url()
    
    log.debug("get_authorisation_url(): %s" % oauth_request_url)
    return oauth_request_url

def exchange_request_token_for_access_token(request_token):
    parameters = dict(scope=SCOPE)
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
                                    consumer, 
                                    token=request_token, 
                                    http_url=OAUTH_ACCESS_TOKEN_URL,
                                    parameters=parameters)
    
    oauth_request.sign_request(signature_method, consumer, request_token)
    resp = fetch_response(oauth_request, connection)
    
    log.debug("exchange_request_token_for_access_token: %s" % resp)
    try:
        token = oauth.OAuthToken.from_string(resp)
    except Exception, e:
        log.debug("Request for token failed: %s" % resp)
        token = None
        
    return token
