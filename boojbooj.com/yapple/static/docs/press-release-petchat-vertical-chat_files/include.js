// Intialize the DTM Loader
if(window.DTM_LOADER === undefined) {
	var DTM_LOADER = {};
	DTM_LOADER.widgets = {};
	DTM_LOADER.queue = [];
	// Define action to take once yui loader is present on the page
	DTM_LOADER.startup = function() {
		var startup = new YAHOO.util.YUILoader();
		startup.require(['event', 'dom']);
		startup.loadOptional = false;
		startup.insert({
			onSuccess:function() {
				DTM_LOADER.available = true;
//        YAHOO.util.Event.on(window, "load", DTM_LOADER.clearQueue);
        YAHOO.util.Event.onDOMReady(DTM_LOADER.clearQueue);
			}
		});
	}
	DTM_LOADER.addToQueue = function(widget) {
		DTM_LOADER.queue.push(widget);
	}
	DTM_LOADER.clearQueue = function() {
		if(DTM_LOADER.queue.length > 0) {
			var widget = DTM_LOADER.queue.shift();
			DTM_LOADER.load(widget);
			DTM_LOADER.clearQueue();
		}
	}
	DTM_LOADER.register = function(widget) {
		DTM_LOADER.addToQueue(widget);
		if(DTM_LOADER.available) {
			DTM_LOADER.clearQueue();
		}
	}
	DTM_LOADER.load = function(widget) {
		var module, requires = DTM_LOADER.widgets[widget].requires;
		DTM_LOADER.widgets[widget].loader = new YAHOO.util.YUILoader();
		for(var i=0; i<DTM_LOADER.widgets[widget].modules.length; i++) {
			module = DTM_LOADER.widgets[widget].modules[i];
			requires.push(module.name);
			DTM_LOADER.widgets[widget].loader.addModule(module);
		}
		DTM_LOADER.widgets[widget].loader.require(requires);
		DTM_LOADER.widgets[widget].loader.loadOptional = false;
		DTM_LOADER.widgets[widget].loader.data = DTM_LOADER.widgets[widget].launcher;
		DTM_LOADER.widgets[widget].loader.combine = true;
		DTM_LOADER.widgets[widget].loader.insert({
			onSuccess:function(launcher) {
				launcher.data();
			}
		});
	}
	DTM_LOADER.poll = function() {
		if(window.YAHOO !== undefined && YAHOO.util !== undefined && YAHOO.util.YUILoader !== undefined) {
			DTM_LOADER.startup();
		} else {
			window.setTimeout(DTM_LOADER.poll,10);
		}
	}
	// Add the Loader to the page if it is not defined
	if(window.YAHOO === undefined || YAHOO.util === undefined || YAHOO.util.YUILoader === undefined) {
		DTM_LOADER.yuiloader = function() {
			var s = document.createElement('script');
			s.setAttribute('type','text/javascript');
			s.setAttribute('src','http://yui.yahooapis.com/2.5.2/build/yuiloader/yuiloader-beta-min.js');
			document.getElementsByTagName('head')[0].appendChild(s);
		}();
	}
	DTM_LOADER.poll();
}


if(DTM_LOADER.widgets.sparky === undefined) {
	if (DTM_LOADER.timestamp === undefined) { DTM_LOADER.timestamp = new Date(); }
	DTM_LOADER.widgets.sparky = {};
	DTM_LOADER.widgets.sparky.params = {};
	DTM_LOADER.widgets.sparky.params.domClass = "dtm-sparky-100";
	DTM_LOADER.widgets.sparky.params.feeds = { 
																			videos 	: "http://mc.dogtimemedia.com/feeds/channels/interlaced/p/41/s/10/video/partial.js?callback=DTM.widget.sparky.renderVideos&_dc=" + DTM_LOADER.timestamp.getTime(),
																			photos 	: "http://mc.dogtimemedia.com/feeds/channels/54/image/partial.1.js?callback=DTM.widget.sparky.renderImages&_dc=" + DTM_LOADER.timestamp.getTime(), 
																			articles: "http://mc.dogtimemedia.com/feeds/channels/interlaced/p/41/s/10/article/partial.js?callback=DTM.widget.sparky.renderArticles&_dc=" + DTM_LOADER.timestamp.getTime(),
																			blogs 	: "http://mc.dogtimemedia.com/feeds/channels/10/blog/partial.1.js?callback=DTM.widget.sparky.renderBlogs&_dc=" + DTM_LOADER.timestamp.getTime()
	};
	DTM_LOADER.widgets.sparky.params.assetsURL = "http://partners.dogtime.com/network/0.0.1/assets/000/100/sparky/current/";
	DTM_LOADER.widgets.sparky.params.coreURL = "http://partners.dogtime.com/network/0.0.1/core/sparky/";
	DTM_LOADER.widgets.sparky.params.variation = "mediacenter-160x300";
	DTM_LOADER.widgets.sparky.params.variationName = "mediacenter";
	DTM_LOADER.widgets.sparky.params.variationDimensions = "160x300";
	DTM_LOADER.widgets.sparky.params.variationFileExtension = "-mediacenter-160x300";
	DTM_LOADER.widgets.sparky.params.tabOrder = "videos,articles,photos,blogs";
	DTM_LOADER.widgets.sparky.modules = [	{ name : 'DTM.widget.sparky', type : 'js', fullpath : (DTM_LOADER.widgets.sparky.params.coreURL+'j/dtm-sparky-'+DTM_LOADER.widgets.sparky.params.variationDimensions+'.js?v=2') },
																				{ name : 'DTM.widget.sparkyRender', type : 'js', fullpath : (DTM_LOADER.widgets.sparky.params.coreURL+'j/variations/'+DTM_LOADER.widgets.sparky.params.variationDimensions+'/'+DTM_LOADER.widgets.sparky.params.variationName+'.js?v=2') },
																				{ name : 'DTM.widget.sparkyCSS', type : 'css', fullpath : (DTM_LOADER.widgets.sparky.params.assetsURL+'c/dtm-sparky-'+DTM_LOADER.widgets.sparky.params.variationDimensions+'.css?v=2') },
																				{ name : 'DTM.widget.sparkyVariationCSS', type : 'css', fullpath : (DTM_LOADER.widgets.sparky.params.assetsURL+'c/dtm-sparky'+DTM_LOADER.widgets.sparky.params.variationFileExtension+'.css?v=2') } ];
  DTM_LOADER.widgets.sparky.requires = ['dom', 'element', 'event', 'json', 'tabview'];
	DTM_LOADER.widgets.sparky.launcher = function() { 
		DTM.widget.sparkyRender.init(DTM_LOADER.widgets.sparky.params);
		DTM.widget.sparky.init(DTM_LOADER.widgets.sparky.params);
	};
	DTM_LOADER.register('sparky');
}
