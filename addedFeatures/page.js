
var CAPTURE_DELAY = 50;

// if (document.readyState === 'ready' || document.readyState === 'complete') {
//     console.log('ready');
//     killStickys();
//     onMessage();
//   } else {
//     console.error('Waiting for all images to fully load');
//     document.onreadystatechange = function () {
//       if (document.readyState == "complete") {
//         console.log("now I'm ready");
//         killStickys();
//         onMessage();
//       }
//     }
//   }

// var i, elements = document.querySelectorAll('body *');
// // 1-4 regoarts, 5. artsy, 
// var headerNav = document.querySelectorAll('.navigation, .header-trigger, .user-menu-wrapper, .search-results-overlay, #main-layout-header')

// console.log(headerNav)

// for (i = 0; i < headerNav.length; i++) {
//     headerNav[i].style.position = "relative";
//   }
    // for (i = 0; i < elements.length; i++) {
    //   if (getComputedStyle(elements[i]).position === 'fixed') {
    //     console.log(elements[i])
// //         elements[i].parentNode.removeChild(elements[i]);
        
//       }
//       console.log("Killed stickys")
//     }

console.log(window.location.hostname)

// Remove specific sticky id or classes
if (window.location.hostname == 'www.ragoarts.com') {
    var toRemove = document.querySelectorAll('#chatlio-widget-container')

    for (i = 0; i < toRemove.length; i++) {
        console.log(toRemove);
        toRemove[i].parentNode.removeChild(toRemove[i]);
    };
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
          window.addEventListener ('click', function() {
              chrome.tabs.captureVisibleTab(null, {format : "png"}, function(data) {
                    screenshot.data = data;
                    screenshot.saveScreenshot();
                }); 
            });
          }
      };
  
  screenshot.init();

}

// To Modify 

if (window.location.hostname == 'www.phillips.com') {
    try {
    let lotInfo = document.querySelectorAll('.lot-information');
    let location = document.querySelectorAll('.page-controls');
    console.log(lotInfo)
    console.log(location)
    let clone = lotInfo.firstElementChild.cloneNode(true);
    location.appendChild(clone);
    lotInfo.className = 'remove';
    } catch(err) {
        console.log("skip removing")
    }
};

if (window.location.hostname == 'www.sothebys.com') {
    try {
    var toEdit = document.getElementsByClassName('col-xs-12 col-sm-12 col-md-4 col-lg-4 css-1em73ry')
    toEdit[0].className = 'col-xs-12 col-sm-12 col-md-4 col-lg-4';
    } catch(err) {
    console.log("skip sothebys")
    }

};

if (['bidtoart.com', 'mearto.com', 'www.ebth.com', 'www.askart.com', 'www.lotsearch.net',
    'nyshowplace.com'].indexOf(window.location.hostname) >= 0)  {
    var i, elements = document.querySelectorAll('body *');

    for (i = 0; i < elements.length; i++) {
        if (getComputedStyle(elements[i]).position === 'fixed') {
        console.log(elements[i])
        if (elements[i].id !== 'header') {
        elements[i].parentNode.removeChild(elements[i]);
        }

      }
    };
    
    
};

    var website = window.location.hostname.split('.')
    if (website.length == 3) {
        websiteName = website[1];
    } else {
        websiteName = website[2];
    };

    


    localStorage.setItem('Website', window.location.hostname)
    localStorage.setItem('Title', document.title)
    localStorage.setItem('URL', window.location.href)
    localStorage.setItem('Date Accessed', Date())

    console.log(localStorage.getItem('Website'));
    console.log(localStorage.getItem('Title'));
    console.log(localStorage.getItem('URL'))
    console.log(localStorage.getItem('Date Accessed'))

    var name = window.location.href.split('?')[0].split('#')[0];
    if (name) {
        name = name
            .replace(/^https?:\/\//, '')
            .replace(/[^A-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^[_\-]+/, '')
            .replace(/[_\-]+$/, '');
        name = '-' + name;
    } else {
        name = '';
    }
    console.log('screencapture' + name + '-' + Date.now() + '.png');


var toRemove = document.querySelectorAll('.auction-grid, #cookies_banner, #cookie-consent, .block-no-access, .intercom-app, .scrollTop, .scrollup, .clickScroll, .back-to-top, #toTop, .button-go-up, .remove, .feedback-row, .olark-launch-button')

for (i = 0; i < toRemove.length; i++) {
    console.log(toRemove);
    toRemove[i].parentNode.removeChild(toRemove[i]);
};


function onMessage(data, sender, callback) {
    
    if (data.msg === 'scrollPage') {
        getPositions(callback);
        return true;
    } else if (data.msg == 'logMessage') {
        console.log('[POPUP LOG]', data.data);
    } else {
        console.error('Unknown message received from background: ' + data.msg);
    }
}

if (!window.hasScreenCapturePage) {
    window.hasScreenCapturePage = true;
    chrome.runtime.onMessage.addListener(onMessage);
}


function max(nums) {
    return Math.max.apply(Math, nums.filter(function(x) { return x; }));
}
    

function getPositions(callback) {

    var body = document.body,
        originalBodyOverflowYStyle = body ? body.style.overflowY : '',
        originalX = window.scrollX,
        originalY = window.scrollY,
        originalOverflowStyle = document.documentElement.style.overflow;

    // try to make pages with bad scrolling work, e.g., ones with
    // `body { overflow-y: scroll; }` can break `window.scrollTo`
    if (body) {
        body.style.overflowY = 'visible';
    }

    var widths = [
            document.documentElement.clientWidth,
            body ? body.scrollWidth : 0,
            document.documentElement.scrollWidth,
            body ? body.offsetWidth : 0,
            document.documentElement.offsetWidth
        ],
        heights = [
            document.documentElement.clientHeight,
            body ? body.scrollHeight : 0,
            document.documentElement.scrollHeight,
            body ? body.offsetHeight : 0,
            document.documentElement.offsetHeight
            // (Array.prototype.slice.call(document.getElementsByTagName('*'), 0)
            //  .reduce(function(val, elt) {
            //      var h = elt.offsetHeight; return h > val ? h : val;
            //  }, 0))
        ],
        fullWidth = max(widths),
        fullHeight = max(heights),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        arrangements = [],
        // pad the vertical scrolling to try to deal with
        // sticky headers, 250 is an arbitrary size
        scrollPad = 200,
        yDelta = windowHeight - (windowHeight > scrollPad ? scrollPad : 0),
        xDelta = windowWidth,
        yPos = fullHeight - windowHeight,
        xPos,
        numArrangements;

    // During zooming, there can be weird off-by-1 types of things...
    if (fullWidth <= xDelta + 1) {
        fullWidth = xDelta;
    }

    // Disable all scrollbars. We'll restore the scrollbar state when we're done
    // taking the screenshots.
    document.documentElement.style.overflow = 'hidden';

    while (yPos > -yDelta) {
        xPos = 0;
        while (xPos < fullWidth) {
            arrangements.push([xPos, yPos]);
            xPos += xDelta;
        }
        yPos -= yDelta;
    }

    /** */
    console.log('fullHeight', fullHeight, 'fullWidth', fullWidth);
    console.log('windowWidth', windowWidth, 'windowHeight', windowHeight);
    console.log('xDelta', xDelta, 'yDelta', yDelta);
    var arText = [];
    arrangements.forEach(function(x) { arText.push('['+x.join(',')+']'); });
    console.log('arrangements', arText.join(', '));
    /**/

    numArrangements = arrangements.length;

    function cleanUp() {
        document.documentElement.style.overflow = originalOverflowStyle;
        if (body) {
            body.style.overflowY = originalBodyOverflowYStyle;
        }
        window.scrollTo(originalX, originalY);
    }

    (function processArrangements() {
        if (!arrangements.length) {
            cleanUp();
            if (callback) {
                callback();
            }
            return;
        }

        var next = arrangements.shift(),
            x = next[0], y = next[1];

        window.scrollTo(x, y);

        var data = {
            msg: 'capture',
            x: window.scrollX,
            y: window.scrollY,
            complete: (numArrangements-arrangements.length)/numArrangements,
            windowWidth: windowWidth,
            totalWidth: fullWidth,
            totalHeight: fullHeight,
            devicePixelRatio: window.devicePixelRatio
        };

        // console.log('>> DATA', JSON.stringify(data, null, 4));

        // Need to wait for things to settle
        window.setTimeout(function() {
            // In case the below callback never returns, cleanup
            var cleanUpTimeout = window.setTimeout(cleanUp, 1250);

            chrome.runtime.sendMessage(data, function(captured) {
                window.clearTimeout(cleanUpTimeout);

                if (captured) {
                    // Move on to capture next arrangement.
                    processArrangements();
                } else {
                    // If there's an error in popup.js, the response value can be
                    // undefined, so cleanup
                    cleanUp();
                }
            });

        }, CAPTURE_DELAY);
    })();
}
