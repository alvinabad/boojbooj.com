
var logger = {};
logger.log = function(msg) {};

if (typeof console !== 'undefined') {
	logger = console;
}

ChangeCursor = function() {
    this.style.cursor = "pointer";	
}

Maximize = function() {
	var id_attr = this.parentNode.getAttribute("id");
	logger.log("MAXIMIZE:", id_attr);
    jQuery(this.parentNode).height(OrigHeight[id_attr]);
    //jQuery(this.parentNode).css("display", "block");
    //logger.log(this.parentNode);
}

OrigHeight = {};

Minimize = function() {
	var id_attr = this.parentNode.getAttribute("id");
	logger.log("MINIMIZE:", id_attr);
    OrigHeight[id_attr] = jQuery(this.parentNode).height();
    jQuery(this.parentNode).height("30px");
    //jQuery(this.parentNode).css("display", "none");
}


function init() {
	var text = "fhsdjfhsd  sdhjfhsd hsdfh sdjhhttp://www.youtube.com/watch?v=RwVHFzyPrBU hshddjfk dkdjdjd lfdfkd";
	var regex = /.*(http:\/\/www.youtube.com\/watch\?v=[A-Za-z0-9_-]+)\s*/;
	var myRe = new RegExp(regex);
	var match = myRe.exec(text);
	logger.log(match[1]);
	
	jQuery("div.title_header").bind("mouseover", ChangeCursor);
	jQuery("div.title_header").toggle(Minimize, Maximize);
	//jQuery(".win").corner("7px");
}

jQuery(document).ready(init);
