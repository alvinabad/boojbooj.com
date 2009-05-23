var DEBUG = true;

/*************************************************************************
 * Set Logger Functionality
 *************************************************************************/
var logger = {};
logger.log = function(msg) {
    return;
};

if (window.DEBUG && typeof(console) !== 'undefined') {
    logger = console;
}

/*************************************************************************
 * Chat Object
 *************************************************************************/
var Chat = {};

if (typeof Video == 'undefined') {
    var Video = {};
}

Video.currentTime = 0;
Video.previousTime = 0;
Video.lastRecord = -1;
Video.id = video_id;
Video.url = null;
Video.previousId = null;

Chat.MAX_LENGTH_TEXT_MESSAGE = 175;
Chat.MAX_NUM_MESSAGES = 50;
Chat.NING_GUEST_GREETING = "You need to be a member of this social network " +
                           "to join this chat room.";
Chat.GUEST_GREETING = "You must be logged-in to add comments";

Chat.POLL_INTERVAL = 7500;
Chat.pollIntervalId;

Chat.isUserGuest = true;

Chat.room = {};
Chat.user = {};
Chat.user.name = null;
Chat.user.greeting = "Welcome";
Chat.messages = {}
Chat.messages.last_id = 0;

Chat.sendMessageUrl = "/video/sendMessage/";
Chat.getMessageUrl = "/video/getMessages/";

Chat.body_w = {width: 0, height: 0};
Chat.main_w = {width: 0, height: 0};
Chat.header_w = {width: 0, height: 0};
Chat.messages_w = {width: 0, height: 0};
Chat.users_w = {width: 0, height: 0};
Chat.window = {width: 0, height: 0};
Chat.footer_w = {width: 0, height: 0};
Chat.maindiff = {width: 0, height: 0};
Chat.messages_w.INIT_HEIGHT = 200;

/*************************************************************************
 * 
 *************************************************************************/
Chat.sendMessage = function(text_message) {
    //Chat.user.name = Chat.retrieveUserInputName();
    if (Chat.user.name == null) {
        Chat.setUserComment(Chat.GUEST_GREETING);
        jQuery("#input_username").focus();
        return;
    }
    Chat.setUserComment();
    
    // trim and remove excess whitespace
    text_message = jQuery.trim(text_message);
    
    if (text_message.length == 0) {
        Chat.clearTextMessage();
        return;
    }
    
    text_message = text_message.slice(0, Chat.MAX_LENGTH_TEXT_MESSAGE);
    
    jQuery("#comment").focus();
    //text_message = text_message.replace(/\s+/g, " ");
    Chat.clearTextMessage();
    
    var data = new Object();
    data['video_id'] = Video.id;
    data['postedby'] = Chat.user.name;
    data['message'] = text_message;
    data['last_record'] = Video.lastRecord;
    
    if (Video.currentTime < 0) {
        data['current_time'] = 0;
    }
    else {
        data['current_time'] = Video.currentTime;
    }
    
    Chat.stopPolling();
    
    // send AJAX request
    if (Chat.sendMessageUrl != null) {
        jQuery.post(Chat.sendMessageUrl, data, Chat.sendMessageCallback, "json");
    }
    
    Chat.startPolling();
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.sendMessageCallback = function (data) {
    Chat.displayMessages(data.messages);
    Video.lastRecord = data.last_record;
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.onkeyup = function(event) {
    var text_message = jQuery("#comment").val();
    
    if (event.keyCode === 13 && !event.shiftKey) {
        Chat.sendMessage(text_message);
    }
        
    if (text_message.length > Chat.MAX_LENGTH_TEXT_MESSAGE) {
        alert("You have exceeded the maximum number or characters");
        Chat.sendMessage(text_message);
    }
}

Chat.addComment = function() {
    var text_message = jQuery("#comment").val();
    Chat.sendMessage(text_message);
}
/*************************************************************************
 * 
 *************************************************************************/
Chat.clearTextMessage = function(message) {
    if (!message) {
        jQuery("#comment").val("");
    }
    else {
        jQuery("#comment").val(message);
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.clearMessages = function() {
    jQuery("div#messages_div").html("");
    var num_messages = jQuery("div#messages_div .message").size(); 
    //logger.log("Chat.clearMessages()");
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.highlightUser = function(event) {
    if (event.type == 'mouseover') {
        Chat.previousColor = jQuery(this).css('background-color');
        jQuery(this).css('background-color', 'lightblue');
        jQuery(this).css('cursor', 'pointer');
    }
    else if (event.type == 'mouseout') {
        jQuery(this).css('background-color', Chat.previousColor);
        jQuery(this).css('cursor', 'default');
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.selectUser = function(event) {
    //var username = jQuery(this).text();
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.displayUsers = function(users) {
    jQuery("#users").html("");
    for(var i=0; i<users.length; i++) {
        user = users[i];
        var html = "<div class='username'>" +
                   user.name + "</div>";
        jQuery("#users").append(html);
    }
    
    jQuery("div.username").bind("mouseover", Chat.highlightUser)
                          .bind("mouseout", Chat.highlightUser)
                          .bind("click", Chat.selectUser);
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.displayMessages = function(messages) {
    var num_messages = jQuery("div#messages_div .message").size();
    
    //TODO: Decide if we want to implement this
    /***
    if (num_messages > Chat.MAX_NUM_MESSAGES) {
        Chat.clearMessages();
    }
    ***/
    
    if (messages.length <= 0) {
        return;
    }
    
    for(var i=0; i<messages.length; i++) {
        var msg = messages[i];
        msg.message = msg.message.replace(/</g, '&lt;');
        msg.message = msg.message.replace(/>/g, '&gt;');
        
        var min = (msg.current_time/1000) / 60 | 0;
        var sec = (msg.current_time/1000) % 60;
        msg.min_sec = sprintf("%d:%02d", min, sec);
        
        
        /*
        var sender_html = "<span class='sender'>" + msg.postedby + ": </span>";
        var msg_html = "<span class='msg'>" + msg.message + "</span>";
        var msg_time_html = "<div class='msg_time'>" + min_sec + "</div>";
        var html = "<div class='message'>" + 
                   msg_time_html + sender_html + msg_html +
                   "</div>";
        */
        html = Chat.generateMessageDiv(msg);
        jQuery("div#messages_div").append(html);
        
        //html = Chat.generateTweetThisDiv(msg.message);
        //jQuery("div#messages_div").append(html);
    }
    Chat.scrollDownDiv(jQuery("div#messages_div").get(0));
    
    jQuery("div.message").bind("click", Chat.selectUser);
    jQuery("div#messages_div .message:even").addClass('striped');
}

Chat.generateMessageDiv = function(msg) {
	var html = "";
	var sender_html;
	var indexof_twitter = msg.postedby.indexOf("::twitter");
	
	if (indexof_twitter > 0) {
		var username = msg.postedby.substr(0, indexof_twitter);
        sender_html = '<span class="sender">' + 
                      '<a href="http://twitter.com/' + username + '">' +
                      msg.postedby + '</a>' + 
                      " said: </span>";
	}
	else {
        sender_html = '<span class="sender">' + msg.postedby + " said: </span>";
	}
    var msg_html = "<span class='msg'>" + msg.message + "</span>";
    var msg_time_html = "<span class='msg_time'>" + msg.min_sec + "</span>";
    var html = '<div class="message">' + 
               //msg_time_html + 
               sender_html + '<br />' +
               msg_html + 
               "</div>";
    return html;
}

Chat.generateTweetThisDiv = function(message) {
	message = "Posted a comment on http://yapple.yaploud.com/: " + message;
	var url = 'http://twitter.com/home?status=' + message;
	var html = '<a target="_blank" href="' + url + '">' +
               '<img class="tweet_this" ' +
               'src="http://assets1.twitter.com/images/favicon.png" ' +
               'alt="Tweet this" />' +
               '</a>';
	html = '<div class="tweet_this_div">' + html + '</div>';
	return html;
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.scrollDownDiv = function (id) {
    id.scrollTop = id.scrollHeight;
    if ( navigator.appName == "Microsoft Internet Explorer" ) {
        id.scrollTop = id.scrollHeight; // IE7 requires running this twice!
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.getMessages = function () {
    if  (Video.currentTime < 0) {
        return;
    }
    if (Video.currentTime == Video.previousTime) {
        return;
    }
    Video.previousTime = Video.currentTime;
    
    var data = new Object();
    data['video_id'] = Video.id;
    data['current_time'] = Video.currentTime;
    data['last_record'] = Video.lastRecord;
    
    // send AJAX request
    if (Chat.getMessageUrl != null) {
        jQuery.post(Chat.getMessageUrl, data, Chat.getMessageCallback, "json");
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.getMessageCallback = function (data) {
    Video.lastRecord = data.last_record;
    Chat.displayMessages(data.messages);
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.disableTextarea = function (message) {
    jQuery("#comment").get(0).disabled = true;
    if (typeof message !== 'undefined') {
        jQuery("#comment").val(message);
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.enableTextarea = function (message) {
    jQuery("#comment").get(0).disabled = false;
    if (typeof message !== 'undefined') {
        jQuery("#comment").val(message);
    }
    else {
        jQuery("#comment").val("");
    }
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.getUserName = function() {
    if (Chat.isUserGuest) {
        Chat.user.name = Chat.retrieveUserInputName();
    }
    return Chat.user.name;
}

/*************************************************************************
 * 
 *************************************************************************/
Chat.retrieveUserInputName = function () {
    var txt = jQuery("input#input_username").val();
    txt = jQuery.trim(txt);
    if (txt == "") {
        return null;
    }
    else {
        return txt;
    }
};

Chat.setUserComment = function(message) {
    var msg = ""
    if (typeof(message) !== 'undefined') {
        msg = message;
    }
    jQuery("#user_comment").html(msg);
}
/*************************************************************************
 * Initialize Chat room name
 *************************************************************************/
Chat.setChatRoomName = function () {
    var html = '<a href="' + Chat.room.name + '">' + 
               Chat.room.name + '</a>';
    jQuery("span#chat_room").append(html);
}

/*************************************************************************
 * Initialize user
 *************************************************************************/
Chat.initUser = function () {
    var html;
    
    if (typeof username !== 'undefined' && username.length > 0 && username !== "None") {
    	Chat.user.name = username;
    }
    
    if (Chat.user.name == null) {
    	Chat.disableTextarea(Chat.GUEST_GREETING);
    	/*
        jQuery("div#user_greeting").html("Enter guest username: ");
        html = '<input type="text" SIZE="8" MAXLENGTH="10" ' +
               'id="input_username" name="input_username" value=""/>';
        html += ' <span id="user_comment"></span>';
        jQuery("div#user_greeting").append(html);
        jQuery("input#input_username").bind("change", Chat.retrieveUserInputName);
        */
        Chat.isUserGuest = true;
    }
    else {
        Chat.user.name = jQuery.trim(Chat.user.name);
        html = "<b>" + Chat.user.greeting + " " + Chat.user.name + "!</b>";
        Chat.clearTextMessage();
        jQuery("div#user_greeting").html(html);
        Chat.isUserGuest = false;
    }
}

/*************************************************************************
 * Start cron job for periodic getting of messages
 *************************************************************************/
Chat.startPolling = function () {
    Chat.pollIntervalId = setInterval(Chat.getMessages, Chat.POLL_INTERVAL);
}

/*************************************************************************
 * Stop cron job for getting of messages
 *************************************************************************/
Chat.stopPolling = function () {
    clearInterval(Chat.pollIntervalId);
}

/*************************************************************************
 * Initialize Chat Module
 *************************************************************************/
Chat.init = function () {    
    //Chat.setChatRoomName();
    Chat.initUser();
    Chat.startPolling();
    Chat.getMessages();
    
    // Set focus to the textarea
    if (Chat.isUserGuest) {
        jQuery("#input_username").focus();
    }
    else {
        jQuery("#comment").focus();
    }
    
    jQuery("#comment").bind("keyup", Chat.onkeyup);
    jQuery("#add_comment_button").bind("click", Chat.addComment);
}

/*************************************************************************
 * Initialize Chat Module on document ready
 *************************************************************************/
jQuery(document).ready(function(){
    Chat.init();
});