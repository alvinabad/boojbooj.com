import simplejson as json
import urllib2
from StringIO import StringIO

import gdata.youtube
import gdata.youtube.service
client = gdata.youtube.service.YouTubeService()


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
        

    def getMostViewedVideos(self):
        videos = []
        uri = gdata.youtube.service.YOUTUBE_STANDARD_MOST_VIEWED_URI
        uri = "%s?time=this_week" % uri
        
        #feed = client.GetMostViewedVideoFeed()
        feed = client.GetYouTubeVideoFeed(uri)
        
        for entry in feed.entry:
            video = {}
            id = entry.id.text.split("/")
            num = len(id)
            id = id[num-1]
            
            video['title'] = entry.title.text
            video['id'] = id
            video['img'] = "http://img.youtube.com/vi/%s/default.jpg" % id
            video['url'] = "/yt/%s" % id
            
            videos.append(video)
            
        return videos
          
    def getTopFavoritesVideos(self):
        videos = []
        feed = client.GetTopFavoritesVideoFeed()
        
        for entry in feed.entry:
            video = {}
            id = entry.id.text.split("/")
            num = len(id)
            id = id[num-1]
            
            video['title'] = entry.title.text
            video['id'] = id
            video['img'] = "http://img.youtube.com/vi/%s/default.jpg" % id
            video['url'] = "/yt/%s" % id
            
            videos.append(video)
            
        return videos
          
    def getMostViewedVideos2(self):
        videos = []
        feed = client.GetMostViewedVideoFeed()
        return feed.entry
    
        for entry in feed.entry:
            video = {}
            id = entry.id.text.split("/")
            num = len(id)
            id = id[num-1]
            
            video['title'] = entry.title.text
            video['id'] = id
            video['img'] = "http://img.youtube.com/vi/%s/default.jpg" % id
            video['url'] = "/yt/%s" % id
            
            videos.append(video)
            
        return videos
          
        
        
if __name__ == '__main__':
    ys = YoutubeService()
    
    video = ys.getMostViewedVideos2()[0]
    #for video in ys.getMostViewedVideos2():
    #    print video.media
     
    print video.title
    print video.player
    print video.title   
        