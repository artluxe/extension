  var scrnshtBtn = document.getElementById('screenshotBtn');

  var screenshot = {
  	content : document.createElement("canvas"),
  	data : '',

 	init : function() {
    	this.initEvents();
  	},

 	saveScreenshot : function() {
    	var image = new Image();
    	image.onload = function() {
      		var canvas = screenshot.content;
      		canvas.width = image.width;
      		canvas.height = image.height;
      		
      		var context = canvas.getContext("2d");
      		context.drawImage(image, 0, 0);

			// save the image
			var link = document.createElement('a');
			link.download = "download.png";
			link.href = screenshot.content.toDataURL();
			link.click();
			screenshot.data = '';
    		};
    	image.src = screenshot.data; 
  	},

	initEvents : function() {
		scrnshtBtn.addEventListener ('click', function() {
            chrome.tabs.captureVisibleTab(null, {format : "png"}, function(data) {
                  screenshot.data = data;
                  screenshot.saveScreenshot();
              }); 
          });
	    }
	};

screenshot.init();