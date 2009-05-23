DTM = YAHOO.namespace("DTM");
DTM.widget = YAHOO.namespace("DTM.widget");
YAHOO.namespace("DTM.widget.sparkyRender");

(function() {
	var Y = YAHOO.util;
	DTM.widget.sparkyRender = function() {
		
		var self = {};
		
		var renderHeaderContents = function(element) {
			element.innerHTML = '<iframe src="'+self.coreURL+'h/sparky-preview.html" width="120" height="90" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowTransparency="true"></iframe>';
		};
		
		var renderBodyContents = function(element) {
			element.innerHTML = '';
		};
		
		var renderAdContents = function(element) {
        element.innerHTML = '<iframe src="'+self.assetsURL+'h/widget_banner.html" width="142" height="30" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowTransparency="true"></iframe>';
		};
		
		var renderFooterContents = function(element) {
			element.innerHTML = '<a href="http://dogtime.com" target="_blank"><img src="'+self.coreURL+'i/variations/160x300/mediacenter/powered-by-dogtime.gif" alt="Powered By Dogtime" border="0" /></a>';
		};
		
		return {
			init : function(data) {
				self.coreURL = data.coreURL;
				self.assetsURL = data.assetsURL;
			},
			renderHeaderContents : renderHeaderContents,
			renderBodyContents : renderBodyContents,
			renderAdContents : renderAdContents,
			renderFooterContents : renderFooterContents
		}
		
	}();
})();
YAHOO.register('DTM.widget.sparkyRender', YAHOO.DTM.widget.sparkyRender, { version : '0.1', build : '1' } );
