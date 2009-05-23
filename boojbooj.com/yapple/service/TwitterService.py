from django.utils import simplejson
from auth import TwitterOauth
from utils import logger
log = logger.log

TWITTER_CHECK_AUTH = 'https://twitter.com/account/verify_credentials.json'
TWITTER_FRIENDS = 'https://twitter.com/statuses/friends.json'

VERIFY_CREDENTIALS = "https://twitter.com/account/verify_credentials"
PUBLIC_TIMELINE_JSON = "https://twitter.com/statuses/public_timeline.json"
USER_TIMELINE = "https://twitter.com/statuses/user_timeline"
SHOW_STATUS = "https://twitter.com/statuses/show/"
FRIENDS = "https://twitter.com/statuses/friends"
FOLLOWERS = "https://twitter.com/statuses/followers"
DIRECT_MESSAGES = "https://twitter.com/direct_messages"
SHOW_USER = "https://twitter.com/users/show"

class TwitterService:
    def __init__(self, access_token=None):
        self.access_token = access_token
    
    def get_friends(self, page):
        """Get friends on Twitter"""
        
        url = FRIENDS + '.json'
        oauth_request = TwitterOauth.request(url, self.access_token, {'page': page})
        json = TwitterOauth.fetch_response(oauth_request, TwitterOauth.connection)
        return simplejson.loads(json)
    
    def getFollowers(self, page):
        """Get followers on Twitter"""
        
        url = FOLLOWERS + '.json'
        oauth_request = TwitterOauth.request(url, self.access_token, {'page': page})
        json = TwitterOauth.fetch_response(oauth_request, TwitterOauth.connection)
        return simplejson.loads(json)
    
    def is_authenticated(self):
        url = VERIFY_CREDENTIALS + '.json'
        oauth_request = TwitterOauth.request(url, self.access_token)
        json = TwitterOauth.fetch_response(oauth_request, TwitterOauth.connection)
        
        if 'screen_name' in json:
            return simplejson.loads(json)
        
        return False

    def getCredentials(self):
        url = VERIFY_CREDENTIALS + '.json'
        oauth_request = TwitterOauth.request(url, self.access_token)
        json = TwitterOauth.fetch_response(oauth_request, TwitterOauth.connection)
        return simplejson.loads(json)

    def getUserInfo(self, key=None):
        info = self.getCredentials()
        
        if key is None:
            return info
        
        try:
            value = info[key]
        except:
            value = None
            
        return value
    
    def getUserTimeline(self, screen_name=None):
        if screen_name is None:
            return []
        
        url = USER_TIMELINE + '.json'
        oauth_request = TwitterOauth.request(url, self.access_token)
        json = TwitterOauth.fetch_response(oauth_request, TwitterOauth.connection)
        return simplejson.loads(json)
        
        
