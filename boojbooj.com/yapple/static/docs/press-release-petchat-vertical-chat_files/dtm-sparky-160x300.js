DTM = YAHOO.namespace("DTM");
DTM.widget = YAHOO.namespace("DTM.widget");
YAHOO.namespace("DTM.widget.sparky");

(function() {
	var Y = YAHOO.util;
	DTM.widget.sparky = function() {
	
		var self = {};
		
		// Loader
    /* If type is defined, just request the one feed, otherwise, request all
     * feeds that have not been loaded yet.
     * In any case, it will only load feeds that have not already been loaded.
     */
		var getRSSLoaderData = function(type) {
			if(self.loading) { return; }
      var feedTypes = type == undefined ? ['photos', 'videos', 'articles', 'blogs'] : [type];
      
      for (var i=0; i<feedTypes.length; i++) {
        if (! self.feedsLoaded[feedTypes[i]]) {
    			self.loading = true;
          Y.Get.script(self.feeds[feedTypes[i]], { onSuccess: onRSSLoaderSuccess, onFailure: onRSSLoaderFailure, scope: this });
        }
      }
		}
		var onRSSLoaderSuccess = function(o) {
			self.loading = false;
		}
		var onRSSLoaderFailure = function(o) {
			self.loading = false;
			self.containers['body'].innerHTML = '<div>There was a problem fetching the data</div>';
		}
		
		// VIDEOS
		var loadVideosContent = function(videos) {
      self.feedsLoaded.videos = true;
			var content = '';
			var link_id, link_id2, entry, entry_content, more_link_id, source_id, duration;
      var display_count = self.maxItems.videos < videos.length ? self.maxItems.videos : videos.length;      
			for(var i=0; i<display_count; i++) {
				entry = videos[i];
				entry_content = '<li>';
				link_id = Y.Event.generateId(entry_content);
				link_id2 = Y.Event.generateId(entry_content);
				source_id = entry['mc:http://mediacore.dogtimemedia.com/:id'];
				entry_content += '<div class="dtm-sparky-pic-image"><a id="'+link_id2+'"><img src="'+entry.group.thumbnail[0].url+'" alt="'+entry.title+'" height="40" width="40" border="0" /></a></div>';
				if(entry.group.content === undefined || entry.group.content.duration === undefined) { duration = ''; } else { duration = secondsToMinutes(entry.group.content.duration); }
				entry_content += '<div class="dtm-sparky-pic-info"><a id="'+link_id+'">'+entry.title+'</a><div class="duration">'+duration+'</div></div>';
				entry_content += '<div class="dtm-sparky-clear"></div>';
				entry_content += '</li>';
				content += entry_content;
				Y.Event.addListener(link_id, "click", openPlayer, { player : 'videos', id : source_id });
				Y.Event.addListener(link_id2, "click", openPlayer, { player : 'videos', id : source_id });
			}
			more_link_id = Y.Event.generateId(content);
			content = '<div class="tabContent"><ul class="dtm-sparky-video">'+content+'</ul></div>';
			content += '<div class="tabContentMore"><a id="'+more_link_id+'"><img src="'+self.coreURL+'i/variations/'+self.variationDimensions+'/'+self.variationName+'/more-videos.gif" alt="ClICK HERE FOR MORE VIDEOS!" border="0" /></a></div>';
			self.containers['tabVideos'].set('content', content);
			Y.Event.addListener(more_link_id, "click", openPlayer, { player : 'videos' });
			
			function secondsToMinutes(seconds) {
				var minutes = Math.floor(seconds/60);
				seconds = "" + (seconds % 60);
				if(seconds.length < 2) {
					seconds = "0" + seconds;
				}
				return(minutes + ":" + seconds);
			}
		}
		
		// PHOTOS
		var loadPhotosContent = function(photos) {
      self.feedsLoaded.photos = true;
			var content = '';
			var link_id, link_id2, photo, photo_content, more_link_id, title;
      var display_count = self.maxItems.photos < photos.length ? self.maxItems.photos : photos.length;      
			for(var i=0; i<display_count; i++) {
				photo = photos[i];
				if(photo.title === null) {
					photo.title = 'Untitled';
				}
				photo_content = '<li>';
				link_id = Y.Event.generateId(photo_content);
				link_id2 = Y.Event.generateId(photo_content);
				title = photo.title.replace(/[-_]+/g, ' ');
				photo_content += '<div class="dtm-sparky-pic-image"><a id="'+link_id2+'"><img src="'+photo.group.content[0].url+'" alt="'+title+'" height="40" width="40" border="0" /></a></div>';
				photo_content += '<div class="dtm-sparky-pic-info"><a id="'+link_id+'">'+title+'</a></div>';
				photo_content += '<div class="dtm-sparky-clear"></div>';
				photo_content += '</li>';
				content += photo_content;
				Y.Event.addListener(link_id, "click", openPlayer, { player : 'photos', id : photo['mc:http://mediacore.dogtimemedia.com/:id'] });
				Y.Event.addListener(link_id2, "click", openPlayer, { player : 'photos', id : photo['mc:http://mediacore.dogtimemedia.com/:id'] });
			}
			more_link_id = Y.Event.generateId(content);
			content = '<div class="tabContent"><ul class="dtm-sparky-photos">'+content+'</ul></div>';
			content += '<div class="tabContentMore"><a id="'+more_link_id+'"><img src="'+self.coreURL+'i/variations/'+self.variationDimensions+'/'+self.variationName+'/more-photos.gif" alt="ClICK HERE FOR MORE PHOTOS!" border="0"/></a></div>';
			self.containers['tabPhotos'].set('content', content);
			Y.Event.addListener(more_link_id, "click", openPlayer, { player : 'photos' });
		}
		
		// ARTICLES
		var loadArticlesContent = function(items) {
      self.feedsLoaded.articles = true;
			var content = '';
			var item, item_content, link_id, more_link_id, info;
			for(var i = 0; i < items.length; i++) {
				item = items[i];
				item_content = '<li>';
				link_id = Y.Event.generateId(item_content);
				item_content += '<a id="'+link_id+'">' + topicNameToSlugImage(item.category) + ' ' + item.title + '</a>';
				item_content += '</li>';
				content += item_content;
				Y.Event.addListener(link_id, "click", openPlayer, { player : 'articles', id : item['mc:http://mediacore.dogtimemedia.com/:id'] });
			}
			more_link_id = Y.Event.generateId(content);
			content = '<div class="tabContent"><ul class="dtm-sparky-articles">'+content+'</ul></div>';
			content += '<div class="tabContentMore"><a id="'+more_link_id+'"><img src="'+self.coreURL+'i/variations/'+self.variationDimensions+'/'+self.variationName+'/more-articles.gif" alt="ClICK HERE FOR MORE ARTICLES!" border="0" /></a></div>';
			self.containers['tabArticles'].set('content', content);
			Y.Event.addListener(more_link_id, "click", openPlayer, { player : 'articles' });
			
			function topicNameToSlugImage(name) {
				var image = name;
				if(YAHOO.lang.isArray(image)) { image = image[0]; }
				image = image.toLowerCase();
				image = image.replace(/[&'\(\)"]+/g, '');
				image = image.replace(/[ -]+/g, '_');
				image = '<img src="'+self.coreURL+'i/slugs/'+image+'.gif" alt="'+name+'" border="0" />';
				return(image);
			}
		}
		
		// BLOGS
		var loadBlogsContent = function(blog_posts) {
      self.feedsLoaded.blogs = true;
			var content = '';
			var item, item_content, link, link_id, more_link_id;
			for(var i = 0; i < blog_posts.length; i++) {
				item = blog_posts[i];
				item_content = '<li>';
				link_id = Y.Event.generateId(item_content);
				link = '<a id="'+link_id+'">' + item.title + '</a>';
				item_content += '<div class="date">' + formatDate(item.pubDate) + '</div><div class="title">' + link  + '</div>';
				item_content += '</li>';
				content += item_content;
				Y.Event.addListener(link_id, "click", openPlayer, { player : 'blogs', id : item['mc:http://mediacore.dogtimemedia.com/:id'] });
			}
			more_link_id = Y.Event.generateId(content);
			content = '<div class="tabContent"><ul class="dtm-sparky-blogs">'+content+'</ul></div>';
			content += '<div class="tabContentMore"><a id="'+more_link_id+'"><img src="'+self.coreURL+'i/variations/'+self.variationDimensions+'/'+self.variationName+'/more-blogs.gif" alt="ClICK HERE FOR MORE BLOGS!" border="0" /></a></div>';
			self.containers['tabBlogs'].set('content', content);
			Y.Event.addListener(more_link_id, "click", openPlayer, { player : 'blogs' });
			
			// Format the given date/time string
			function formatDate(dateString) {
				var dateParts = dateString.replace(',', '').split(/ +/);
				return(dateParts[0] + ' ' + dateParts[2] + ' ' + dateParts[1] + ', ' + dateParts[3]);
			}
		}
		
		var setupContainer = function() {
			// Main Container
			var elements = Y.Dom.getElementsByClassName(self.domClass, 'div');
			var tabName = null;
			self.container = elements[0];
			self.container.innerHTML = '';
			self.containerID = self.domClass;
			self.container.setAttribute('id', self.containerID);
			// Header
			self.containers['header'] = document.createElement('div');
			Y.Dom.addClass(self.containers['header'], 'hd');
			DTM.widget.sparkyRender.renderHeaderContents(self.containers['header']);
			self.container.appendChild(self.containers['header']);
			// Body
			self.containers['body'] =  document.createElement('div');
			Y.Dom.addClass(self.containers['body'], 'bd');
			DTM.widget.sparkyRender.renderBodyContents(self.containers['body']);
			self.container.appendChild(self.containers['body']);
			// Tabs & Content
			var tabView = new YAHOO.widget.TabView();
				self.containers['tabPhotos'] 		= new YAHOO.widget.Tab({ label: '&nbsp;', active: false, content: spinner(), label : '<div class="sparkyTabPhotos"></div>', href : 'javascript:void(0);' });
				self.containers['tabVideos'] 		= new YAHOO.widget.Tab({ label: '&nbsp;', active: false, content: spinner(), label : '<div class="sparkyTabVideos"></div>', href : 'javascript:void(0);' });
				self.containers['tabArticles'] 	= new YAHOO.widget.Tab({ label: '&nbsp;', active: false, content: spinner(), label : '<div class="sparkyTabArticles"></div>', href : 'javascript:void(0);' });
				self.containers['tabBlogs'] 		= new YAHOO.widget.Tab({ label: '&nbsp;', active: false, content: spinner(), label : '<div class="sparkyTabBlogs"></div>', href : 'javascript:void(0);' });
				// Append Tabs to TabView in desired order
				for(var i=0; i<self.tabOrder.length; i++) {
					tabName = YAHOO.lang.trim(self.tabOrder[i]);
					tabName = 'tab' + tabName.substr(0, 1).toUpperCase() + tabName.substr(1);
					if(i===0) { 
						self.containers[tabName].set('active', true); 
						self.containers[tabName].addClass('dtm-sparky-nav-tab-left');
					} else if(i===(self.tabOrder.length-1)) {
						self.containers[tabName].addClass('dtm-sparky-nav-tab-right');
					}
					tabView.addTab(self.containers[tabName]);
				}
			tabView.appendTo(self.containers['body']);
			// Ad Space
			self.containers['ad'] = document.createElement('div');
			Y.Dom.addClass(self.containers['ad'], 'ad');
			DTM.widget.sparkyRender.renderAdContents(self.containers['ad']);
			self.container.appendChild(self.containers['ad']);
			// Footer
			self.containers['footer'] = document.createElement('div');
			Y.Dom.addClass(self.containers['footer'], 'ft');
			DTM.widget.sparkyRender.renderFooterContents(self.containers['footer']);
			self.container.appendChild(self.containers['footer']);
			var tabView = new YAHOO.widget.TabView(self.containerID);
      
      /* This mouseover event will cause the non-default tabs to load only when
       * there is a chance the user wants to interact with it.
       */
      YAHOO.util.Event.addListener(self.container, "mouseover", loadAllTabs);
      
		}
		
    /* This will just be used as a wrapper to loading all of the tab data. It
     * is being put into a named function so that the event listener can be
     * cancelled once it is executed.
     */
    var loadAllTabs = function () {
      YAHOO.util.Event.removeListener(self.container, "mouseover", loadAllTabs);
      getRSSLoaderData();
    }
    
		var randomize = function(a) {
			return(a.sort(function() { return(0.5 - Math.random()); }));
		}
		
		var spinner = function() {
			return('<div class="loading">&nbsp;</div>');
		}
		
		var openPlayer = function(event, params) {
			var urlParams = '';
			if(params.id !== undefined) {
				urlParams += '?id=' + params.id;
			}
			self.player = window.open(self.assetsURL + 'h/'+params.player+'.html'+urlParams, 'sparkyPlayer', 'modal=yes,toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=yes,width=864,height=736,left=0,top=0');
		}
		
    /* As of 20090330, the renderAdContents is only used to load a tracker. */
    var renderAdContents = function (el) {
      if (el != null) {
        
//			  self.containers['ad'].innerHTML = '<iframe src="' +self.partnerBaseURL + 'h/widget_banner.html" width="142" height="30" scrolling="no" style="border: 0px; margin: 0px; padding 0px"></iframe>';
        self.containers['ad'].innerHTML = '<iframe src="'+self.assetsURL+'h/widget_banner.html" width="142" height="30" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowTransparency="true"></iframe>';
      }
    }

		return { 		
			init : function(data) {
				self.domClass = data.domClass;
				self.feeds = data.feeds;
				self.coreURL = data.coreURL;
				self.assetsURL = data.assetsURL;
				self.variationDimensions = data.variationDimensions;
				self.variationName = data.variationName;
				self.tabOrder = YAHOO.lang.trim(data.tabOrder).split(",");
				self.loading = false;
				self.scrollable = true;
				self.previousScrollTop = false;
				self.containerID = false;
				self.container = false;
				self.bodyID = false;
				self.bodyContainer = false;
				self.scrollCount = 0;
        self.maxItems = {
          videos: 10,
          photos: 10
        };
        self.maxPhotos = 10;
				self.containers = new Array;
        self.feedsLoaded = {
          videos: false,
          photos: false,
          articles: false,
          blogs: false
        };
				setupContainer();
				getRSSLoaderData(self.tabOrder[0]);
			},

			renderVideos : function(results) {
				loadVideosContent(randomize(results.rss.channel.item));
			},
			
			renderImages : function(results) {
				loadPhotosContent(randomize(results.rss.channel.item));
			},
			
			renderArticles : function(results) {
				loadArticlesContent(randomize(results.rss.channel.item));
			},
			
			renderBlogs : function(results) {
				loadBlogsContent(results.rss.channel.item);
			},
      
      renderAdContents : renderAdContents
			
		}	
			
	}();
})();
YAHOO.register('DTM.widget.sparky', YAHOO.DTM.widget.sparky, { version : '0.1', build : '1' } );
