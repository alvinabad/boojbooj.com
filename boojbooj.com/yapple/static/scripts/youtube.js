/*****************************************************************************
  copyright (c) 2009 google inc.

  You are free to copy and use this sample.
  License can be found here: http://code.google.com/apis/ajaxsearch/faq/#license
******************************************************************************/

/*
 * Polling the player for information
 */

var Youtube = {};
Youtube.previousState = null;
Youtube.interval_id = null;
Youtube.youtube_div = "youtube_innerdiv";


google.load("swfobject", "2.1");
// Update a particular HTML element with a new value
function updateHTML(element_id, value) {
	var node = document.getElementById(element_id);
	if (node == null) {
		return;
	}
	node.innerHTML = value;
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
    logger.log("An error occured of type:" + errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
    updateHTML("playerState", newState);
    
    //logger.log("PREVIOUS STATE: " + Youtube.previousState);
    //logger.log("NEW STATE: " + newState);
    
    if (newState == 0) {
        stopPlayer();
    }
    else if (newState == 3 && Youtube.previousState == 0) {  // this plays a new video
        restartPlayer();
    }
    else if (newState == 1 && Youtube.previousState == 0) {  // this plays a new video
        restartPlayer();
    }
    else if (newState == 5) {  // play video on windows load
        //ytplayer.playVideo();
    }
    Youtube.previousState = newState;
}

function stopPlayer() {
    clearInterval(Youtube.interval_id);    
    Youtube.interval_id = null;
    Video.previousId = null;
}

function restartPlayer() {
    Chat.clearMessages();
    Youtube.previousState == null;
    if (Youtube.interval_id == null) {
        Youtube.interval_id = setInterval(updatePlayerInfo, 250);
        updatePlayerInfo();
    }
    Video.lastRecord = -1;
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  var min = 0;
  var sec = 0;
  var currentTime = 0;
  if(ytplayer && ytplayer.getDuration) {
    currentTime = ytplayer.getCurrentTime();
    Video.currentTime = currentTime * 1000; 
    sec = currentTime % 60;
    min = currentTime / 60 | 0;
    //hr = Video.currentTime / 3600 | 0;
    var min_sec = sprintf("%02d:%02.2f", min, sec);
    
    Video.url = ytplayer.getVideoUrl();
    var re = new RegExp(".*\?v=([A-Za-z0-9_-]+)");
    var arr = re.exec(Video.url);
    Video.id = arr[1];
    Video.url = arr[0];
    video_id = Video.id;
                
    if (Video.id != Video.previousId) {
        Chat.clearMessages();
        Video.previousId = Video.id;
        document.getElementById("input_video_url").setAttribute("value", Video.url);
        html = '<img alt="" src="/static/images/typecomments.png"/>';
        jQuery("div#messages_div").append(html);
    }
    
    updateHTML("videoDuration", ytplayer.getDuration());
    updateHTML("video_currenttime", min_sec);
    updateHTML("videoCurrentTime", currentTime);
    updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
    updateHTML("startBytes", ytplayer.getVideoStartBytes());
    updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
    updateHTML("video_id", Video.id);
    updateHTML("video_url", Video.url);
  }
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  Youtube.interval_id = setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // The video to load.
  var videoID = "ip1zsUIosoA"; // default: Journey, Don't Stop Believing
  if (typeof video_id !== 'undefined') {
      var videoID = video_id;
  }
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                     "&enablejsapi=1&playerapiid=ytplayer", //player1",
                     Youtube.youtube_div, "640", "385", "8", null, null, params, atts);
  
}
function _run() {
  loadPlayer();
}

jQuery(document).ready(function(){
    google.setOnLoadCallback(_run);
});