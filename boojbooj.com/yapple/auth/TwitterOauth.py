from auth import oauth
import httplib, time, datetime
from django.utils import simplejson

from django.http import *
from django.conf import settings
from django.shortcuts import render_to_response

from utils import logger
log = logger.log

OAUTH_SERVER = 'twitter.com'
OAUTH_REQUEST_TOKEN_URL = 'https://%s/oauth/request_token' % OAUTH_SERVER
OAUTH_ACCESS_TOKEN_URL = 'https://%s/oauth/access_token' % OAUTH_SERVER
OAUTH_AUTHORIZATION_URL = 'http://%s/oauth/authorize' % OAUTH_SERVER
OAUTH_AUTENTICATE_URL = 'http://%s/oauth/authenticate' % OAUTH_SERVER

# TODO:
#http://twitter.com/oauth/authenticate?oauth_token=2MImP27wXmN4cZJvhtu4whE8DxOmucLkwdfCShCk&oauth_callback=http%3A%2F%2Fsocialize.gigya.com%2FGS%2FSNLink.aspx%3Ft%3DdBFII5RbVxUc8nBdc3bMDT7hmmrIvgen1wCG_dxqadJhAAWkNZSIhV-1DGKZvwZ0-DQUg5JS8Y61ukrjwOp8p81S9pP6R_BhovjemyHtbA0dAsx-PMuL2zIosIac-rUvj3lTh1WL6rg0IY1bFO3pdo47iJG0AOS9nAVSj0kYnr4WZLO9Fq4nraPrlUO_nxfrM1R4c34i--YPYsEwxQLn2jRRcTY0eN_hLys_4Y8i1KJaVnOfMFDmk79vEcn3-pIRlKLIB9kegmJ2_tp_ltsdyu995uWLnZUxJyyzIxGAgBiSgFR-RJNDnIE2n3wle91in7LcKDMv9_ljEoBH3ee9bLtjoay1QiCX2qfpN2ANFd4.%26d%3D1

CONSUMER_KEY = getattr(settings, 'TWITTER_CONSUMER_KEY', 'YOUR_CONSUMER_KEY')
CONSUMER_SECRET = getattr(settings, 'TWITTER_CONSUMER_SECRET', 'YOUR_CONSUMER_SECRET')

# We use this URL to check if Twitters oAuth worked
TWITTER_CHECK_AUTH = 'https://twitter.com/account/verify_credentials.json'
TWITTER_FRIENDS = 'https://twitter.com/statuses/friends.json'

connection = httplib.HTTPSConnection(OAUTH_SERVER)
consumer = oauth.OAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET)
signature_method = oauth.OAuthSignatureMethod_HMAC_SHA1()

# Shortcut around oauth.OauthRequest
def request(url, access_token, parameters=None):
    """
    usage: request( '/url/', your_access_token, parameters=dict() )
    Returns a OAuthRequest object
    """
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer, token=access_token, http_url=url, parameters=parameters,
    )
    oauth_request.sign_request(signature_method, consumer, access_token)
    return oauth_request


def fetch_response(oauth_request, connection):
    url = oauth_request.to_url()
    connection.request(oauth_request.http_method,url)
    response = connection.getresponse()
    s = response.read()
    return s

def get_unauthorised_request_token():
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer, http_url=OAUTH_REQUEST_TOKEN_URL
    )
    oauth_request.sign_request(signature_method, consumer, None)
    resp = fetch_response(oauth_request, connection)
    
    log.debug("get_unauthorised_request_token: %s" % resp)
    try:
        token = oauth.OAuthToken.from_string(resp)
    except Exception, e:
        log.debug("Request for token failed: %s" % resp)
        token = None
        
    return token

def get_authorisation_url(token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer, token=token, http_url=OAUTH_AUTHORIZATION_URL
    )
    oauth_request.sign_request(signature_method, consumer, token)
    oauth_request_url = oauth_request.to_url()
    
    log.debug("get_authorisation_url(): %s" % oauth_request_url)
    return oauth_request_url

def exchange_request_token_for_access_token(request_token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer, token=request_token, http_url=OAUTH_ACCESS_TOKEN_URL
    )
    oauth_request.sign_request(signature_method, consumer, request_token)
    resp = fetch_response(oauth_request, connection)

    log.debug("get_unauthorised_request_token: %s" % resp)
    try:
        token = oauth.OAuthToken.from_string(resp)
    except Exception, e:
        log.debug("Request for token failed: %s" % resp)
        token = None
        
    return token

def is_authenticated(access_token):
    oauth_request = request(TWITTER_CHECK_AUTH, access_token)
    json = fetch_response(oauth_request, connection)
    if 'screen_name' in json:
        return json
    return False

def get_friends(access_token, page):
    """Get friends on Twitter"""
    oauth_request = request(TWITTER_FRIENDS, access_token, {'page': page})
    json = fetch_response(oauth_request, connection)
    return json
    

