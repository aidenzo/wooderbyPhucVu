let nav = document.querySelector('.nav');
let btnmenu = document.querySelector('header .btnmenu');

btnmenu.onclick = function() {

    nav.classList.toggle('clicked');
    this.classList.toggle('clicked');
}

let lang = document.querySelector('.lang');
let langCurr = document.querySelector('.lang .lang__current span');
let langOpt = document.querySelector('.lang .lang__option');
let langItems = document.querySelectorAll('.lang .lang__option a');

lang.addEventListener('click', function() {
    lang.classList.toggle('active');
});

langItems.forEach(function(item) {

    item.addEventListener('click', function() {
        let langText = this.textContent;
        let langCurrentSpan = langCurr.textContent;
        langCurr.innerHTML = langText;
        this.innerHTML = langCurrentSpan;
    })

});

let listItemSlider = document.querySelectorAll('.slider__imgs-item');
let currentSlider = 0;

listItemSlider.forEach(function(itemSlider, index) {
    if (itemSlider.classList.contains('active')) {
        currentSlider = index;
    }

});

//go to next slider
document.querySelector('.--btn-next').addEventListener('click', function() {
    if (currentSlider < listItemSlider.length - 1) {
        /*  listItemSlider[currentSlider].classList.remove('active');
         listItemSlider[currentSlider + 1].classList.add('active');
         currentSlider++; */
        goTo(currentSlider + 1);

        //number.textContent = currentSlider++;
    } else {
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[0].classList.add('active');
        currentSlider = 0; */
        //number.textContent = 0;
        goTo(0);

    }

});

//go to prev slider
document.querySelector('.--btn-prev').addEventListener('click', function() {
    if (currentSlider > 0) {
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[currentSlider - 1].classList.add('active');
        currentSlider--; */
        goTo(currentSlider - 1);

    } else {
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[listItemSlider.length - 1].classList.add('active');
        currentSlider = listItemSlider.length - 1; */
        goTo(listItemSlider.length - 1);
    }

});

let number = document.querySelector('.number');
let dot = document.querySelectorAll('.dotted li');
dot[currentSlider].classList.add('active');

//default active
getSlideNumner(currentSlider + 1);
dot[currentSlider].classList.add('active');

//change number bottom slide
function getSlideNumner(index) {
    number.innerHTML = (index).toString().padStart(2, '0');
};

//move slider
function goTo(index) {
    listItemSlider[currentSlider].classList.remove('active');
    dot[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    currentSlider = index;
    dot[index].classList.add('active');
    getSlideNumner(currentSlider + 1);

}

//change slide when click dot in bottom
dot.forEach(function(li, index) {

    li.addEventListener('click', function() {
        goTo(index);
    });
});

/* langItem.forEach(function(item)  {
    item.addEventListener('click',function )
}); */

//ScrolltoSection
let menus = document.querySelectorAll('.menu li a');
let heightHeader = document.querySelector('header').offsetHeight;
let sections = [];

function removeActiveMenu() {
    menus.forEach(function(menu_element, menu_index) {
        menu_element.classList.remove('active');
    });
}

menus.forEach(function(element, index) {
    let replaceClassNme = element.getAttribute('href').replace('#', '');
    let section = document.querySelector('.' + replaceClassNme);
    sections.push(section);

    element.addEventListener('click', function(e) {
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,
            behavior: "smooth"
        });
        removeActiveMenu();
        element.classList.add('active');
    });
});

window.addEventListener('scroll', function(e) {

    let posScroll = window.pageYOffset;
    sections.forEach(function(section, index) {
        if (section.offsetTop + section.offsetHeight > posScroll && posScroll > section.offsetTop - heightHeader - 120) {
            removeActiveMenu();
            menus[index].classList.add('active');
        } else {
            menus[index].classList.remove('active');
        }
    })
});


//BacktoTop
let backtoptop = document.querySelector('.back-to-top')
backtoptop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});

let posSectionProduct = document.querySelector('.products').offsetTop;
let posSectionNews = document.querySelector('.news').offsetTop;

window.addEventListener('scroll', function(e) {
    let posScroll = window.pageYOffset;
    if (posScroll < posSectionNews && posScroll > posSectionProduct) {
        backtoptop.style.display = 'block';
    } else {
        backtoptop.style.display = 'none';
    }
});

//Popup video


let btn_video = document.querySelectorAll('.videos__item');
let popup_video = document.querySelector('.popup-video');
let close_btn = document.querySelector('.close');
let iframe = document.querySelector('.popup-video iframe');

btn_video.forEach(function(buttonplay) {
    buttonplay.addEventListener('click', function() {
        let video_id = buttonplay.getAttribute('data-video-id');
        console.log(video_id);
        iframe.setAttribute('src', "https://www.youtube.com/embed/" + video_id);
        console.log("https://www.youtube.com/embed/" + video_id);
        popup_video.style.display = 'flex';

    });
});
//cKBRHaPdjbc
//D9VFjACfeQM
close_btn.addEventListener('click', function() {
    iframe.setAttribute('src', "");
    popup_video.style.display = 'none';
})

document.querySelector('.popup-video').addEventListener('click', function(e) {
    iframe.setAttribute('src', "");
    popup_video.style.display = 'none';
})


//header-process
function scrollProcess() {
    let headProgress = $(".header-process");
    let pageHeight = $(document).height() - $(window).height();
    let scrollTop = $(window).scrollTop();

    let progress = (scrollTop / pageHeight) * 100;
    headProgress.css({
        width: progress + '%'
    })


}

$(window).on('scroll', function() {
    scrollProcess();
})


var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// execute above function
initPhotoSwipeFromDOM('.gallery__content-img');