from models import VideoMessages as VideoMessages_DB
from django.db import connection, transaction

import settings
from utils import logger
log = logger.log

class VideoMessages(object):
    def __init__(self):
        pass
        
    def saveMessage(self, msg):
        # Save to database
        try:
            vm = VideoMessages_DB()
            vm.video_id = msg['video_id']
            vm.postedby = msg['postedby']
            vm.currenttime = msg['current_time']
            vm.message = msg['message']
            vm.owner = msg['owner']
            
            vm.save()
        except Exception, e:
            log.info(e)
            raise
        
    def getMessages(self, video_id=None, last_record=None,
                    current_time=None, limit=None):
        messages = []
    
        if last_record is None:
            last_record = -1
        
        current_time = int(float(current_time))
        last_record = int(float(last_record))
        
        if limit is None:    
            limit = settings.MESSAGE_LIMIT
        
        try:
            rows = VideoMessages_DB.objects.filter(video_id=video_id,
                    currenttime__gt=last_record,
                    currenttime__lte=current_time).order_by('-currenttime')[:limit]
            for msg in rows:
                m = {}
                #m['id'] = str(msg.id)
                m['video_id'] = msg.video_id
                m['postedby'] = msg.postedby
                m['message'] = msg.message
                m['current_time'] = str(msg.currenttime)
                m['owner'] = msg.owner
                messages.append(m)
        except Exception, e:
            log.info(e)
            raise
    
        messages.reverse()
        return messages
        
    def getVideoIDs(self):
        video_ids = []
        cursor = connection.cursor()
    
        #sql = "select video_id from VIDEO_MESSAGES group by video_id"
        sql = "select video_id, count(*) as count from VIDEO_MESSAGES "
        sql += "group by video_id order by count desc"
        
        cursor.execute(sql)
        row = cursor.fetchall()
    
        for r in row:
            video_ids.append(r[0])
    
        return video_ids       
    
    def getVideoUrls(self):
        video_urls = []
        #url = "/video/?video_url=http://www.youtube.com/watch?v"
        
        for id in self.getVideoIDs():
            video = {}
            video['img'] = "http://img.youtube.com/vi/%s/default.jpg" % id
            #video['url'] = "%s=%s" % (url, id)
            video['url'] = "/yt/%s" % id
            video_urls.append(video)
            
        return video_urls

    def getVideos(self):
        #url = "/video/?video_url=http://www.youtube.com/watch?v"
        videos = []
        cursor = connection.cursor()
    
        #sql = "select video_id from VIDEO_MESSAGES group by video_id"
        sql = "select video_id, count(*) as count from VIDEO_MESSAGES "
        sql += "group by video_id order by count desc"
        
        cursor.execute(sql)
        row = cursor.fetchall()
    
        for r in row:
            video = {}
            vid = r[0]
            num_msgs = r[1]
            video['id'] = vid
            video['img'] = "http://img.youtube.com/vi/%s/default.jpg" % vid
            #video['url'] = "%s=%s" % (url, vid)
            video['url'] = "/yt/%s" % vid
            video['num_msgs'] = num_msgs
            videos.append(video)
    
        return videos       
        