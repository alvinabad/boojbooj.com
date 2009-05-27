import simplejson as json
import urllib2
from StringIO import StringIO


MOST_POPULAR_URL = "http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?alt=json"
#http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed

class YoutubeService:
    """
    Youtube API Service
    """
    
    def getMostPopularVideos(self):
        url = MOST_POPULAR_URL
        
        try:
            req = urllib2.Request(url)
            response = urllib2.urlopen(req)    
            io = StringIO(response.read())
            self.most_popular_list = json.load(io)
        except Exception, e:
            print e
            return []
        
        return self.most_popular_list
        
    
if __name__ == '__main__':
    ys = YoutubeService()
    mp = ys.getMostPopularVideos()
    #print mp['feed']
    #feed = mp['feed']
    #print list
    #print feed['link']
    #print mp.keys()
    #for key in mp['feed'].keys():
    #    print key
    print mp['feed']['link']    