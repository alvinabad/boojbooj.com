from django.db import models

class VideoMessages(models.Model):
    id = models.IntegerField(primary_key=True)
    video_id = models.CharField(max_length=2700)
    postedby = models.CharField(max_length=192)
    currenttime = models.IntegerField()
    message = models.CharField(max_length=3072)
    owner = models.CharField(unique=True, max_length=192, blank=True)
    class Meta:
        db_table = u'VIDEO_MESSAGES'
