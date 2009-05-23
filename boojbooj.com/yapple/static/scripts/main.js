
var logger = {};
logger.log = function(msg) {};

if (typeof console !== 'undefined') {
	logger = console;
}

var Video = {};

var origBackgroundColor;
Highlight = function(e) {
    if (e.type == 'mouseover') {
        origBackgroundColor = this.style.backgroundColor;
        this.style.backgroundColor = "brown";    
    }
    else if (e.type == 'mouseout') {
        this.style.backgroundColor = origBackgroundColor;    
    }
}

Video.selectText = function() {
     this.focus();
     this.select();
}

Video.watch = function () {
    var video_url = document.watch_video_form.video_url.value;
    var re = new RegExp(".*\?v=([A-Za-z0-9_-]+)");
    var match = re.exec(video_url);
    try {
        location = "/yt/" + match[1];
    }
    catch(e) {
        alert("Invalid Youtube URL. Please try again.");
    }
    return false;
}
     
function init() {
	jQuery(".tabs").bind("mouseover", Highlight);
	jQuery(".tabs").bind("mouseout", Highlight);
    jQuery("#input_video_url").bind("click", Video.selectText);
    jQuery("#navigation").corner("7px");
    jQuery("#content").corner("7px");
}

jQuery(document).ready(init);
