

Twitter = {};
Twitter.div_el = "#latest_tweets_div";
Twitter.search_url = "http://search.twitter.com/search.json";

Twitter.search = function(query) {
    if (query == null) {
    	query = "www.youtube.com/watch";
    }
    var data = new Object();
    data['q'] = query;
    var url = Twitter.search_url;
    
    url += "?callback=?&q=" + query
    jQuery.getJSON(url, data, Twitter.json_callback);
    
    //http://search.twitter.com/search.json?callback=foo&q=twitter 
    //jQuery.post(Chat.getMessageUrl, data, Chat.getMessageCallback, "json");
}

Twitter.json_callback = function(data) {
    var results = data.results;
	var youtube_link_regex = /.*(http:\/\/www.youtube.com\/watch\?v=[A-Za-z0-9_-]{10,})/;
    var youtube_videoid_regex = new RegExp(".*\?v=([A-Za-z0-9_-]+)");
	var re_youtube_link = new RegExp(youtube_link_regex);
	var re_youtube_videoid = new RegExp(youtube_videoid_regex);
    
    jQuery(Twitter.div_el).html("");
    
    for(var i=0; i<results.length; i++) {
        var text = results[i].text;
	
        var from_user = results[i].from_user;
        var profile_image_url = results[i].profile_image_url;
        
        var div_el = document.createElement("div");
        div_el.setAttribute("style", "clear: both;");
        var br_el = document.createElement("br");
        var text_el = document.createTextNode(text);
        var from_user_el = Twitter.generateUserElement(from_user);
        var img_el = Twitter.generateImgElement(profile_image_url, from_user);
        
        div_el.appendChild(img_el);
        div_el.appendChild(from_user_el);
        div_el.appendChild(br_el);
        div_el.appendChild(text_el);
        
        var html = jQuery(div_el).html();
	    var match = re_youtube_link.exec(html);
	    if (match != null) {
	        var youtube_link = match[1];
	        match = re_youtube_videoid.exec(youtube_link);
	        var yt_video_id = match[1];
	        var yapple_yt_link = "/yt/" + yt_video_id;
	        var new_youtube_link = sprintf('<a href="%s">%s</a>', yapple_yt_link, youtube_link);
	        var new_html = html.replace(youtube_link, new_youtube_link);
	        jQuery(div_el).html(new_html);
	    }
        
        jQuery(Twitter.div_el).append(div_el);
        jQuery(Twitter.div_el).append("<p>");
    }
}

Twitter.generateUserElement = function(screen_name) {
    var href_el = document.createElement("a");
    var href = "http://twitter.com/" + screen_name;
    href_el.setAttribute("href", href);
    href_el.setAttribute("target", "_blank");
    
    var from_user_el = document.createTextNode(screen_name + ": ");
    
    href_el.appendChild(from_user_el);
    return href_el;
}

Twitter.generateImgElement = function(img_url, screen_name) {
	var href_el = document.createElement("a");
	var href = "http://twitter.com/" + screen_name;
    href_el.setAttribute("href", href);
    href_el.setAttribute("target", "_blank");
	
    var img_el = document.createElement("img");
    img_el.setAttribute("src", img_url);
    img_el.setAttribute("style", "border: 0; margin: 2px; float: left;");
    img_el.setAttribute("class", "twitter_img");
    
    href_el.appendChild(img_el);
    return href_el;
}

Twitter.init = function() {
    Twitter.search("www.youtube.com/watch");
}

jQuery(document).ready(function(){
    Twitter.init();
});