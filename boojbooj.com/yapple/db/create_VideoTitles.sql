drop table if exists VIDEO_MESSAGES;

CREATE TABLE VIDEO_MESSAGES (
   id           INT NOT NULL AUTO_INCREMENT,
   video_id     VARCHAR(900) NOT NULL,
   postedby     VARCHAR(64) NOT NULL,
   currenttime  INT NOT NULL,
   message      VARCHAR(1024) NOT NULL,
   owner        VARCHAR(64) NULL,
   PRIMARY KEY (id)
) ENGINE=MyISAM;

ALTER TABLE VIDEO_MESSAGES ADD UNIQUE (video_id,owner);
create index video_id_idx on VIDEO_MESSAGES (video_id);
