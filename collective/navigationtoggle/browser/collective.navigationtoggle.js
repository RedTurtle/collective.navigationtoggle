/*jslint white: true, undef: true, nomen: true, regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50, vars: true, indent: 4 */
/*global jQuery: false, document: false, window: false */

/**
 * The collective.navigationtoggle Javascript source.
 * Before think "Ehi, I can write this code more and more jQueryish" be aware...
 * Here I'm trying to get the same feature given up by the jQuery.live() method whitout
 * using it (due to some limitation I found).
 */

jQuery.collective_navigationtoggle = {
    /**
     * Store there all references to navigation elements that must be made
     * expansible/collapsible.
     * Every element can be HREF trailer, that will be looked inside every A elements of
     * navigations or a normal jQuery selector.
     */
    toggle_elements: [],
    
    /**
     * Duration in millisecs for control animation slideUp/slideDown effects when
     * expand/collapse navigation elements. Default to 0 (animation disabled)
     */
    slide_animation: 0,
    
    /**
     * Flag for enable or disable client side cache of HttpXmlRequest
     */
    cache: true,
    
    /**
     * Providing those classes, only provided path inside elements with one of those classes are taken.
     * Used only if you provide path(s) in the toggle_elements.
     */
    toggleContainerClasses: ['portletNavigationTree'],
    
    /**
     * What kind of item must contain the link?
     */
    listType: 'ul',
    listItem: 'li',
	
	/**
	 * For testing purpose, just wrap the window.location.href call
	 */
	_goTo: function(url) {
		window.location.href = url;
	}
};

(function ($) {
    $(document).ready(function () {

        /**
         * Context URL to be used for all AJAX call
         */
		/*
        var call_context = $("head base").attr('href');
        if (call_context.charAt(call_context.length - 1) !== '/') {
            call_context = call_context + '/';
        }
        */
		var call_context = portal_url + '/';
    
        /*
         * Don't want to call the context when is in the portal factory. See the Ale's blog post:
         * http://blog.redturtle.it/redturtle-blog/2010/03/11/careful-with-that-ajax-eugene
         */
		if (call_context.indexOf('/portal_factory') > -1) {
            call_context = call_context.substring(0, call_context.indexOf('/portal_factory') + 1);
        }
		
        var loading_time = new Date().getTime();
        
        /**
         * Generate a new navigation element
         * @param {Object} data structure to be used for filling the element
         * @param {jQuery} wrapper a wrapper element to be used as container
         * @param {boolean} withImage include or not the icon image
         * @param {boolean} wrapDiv wrap all generated HTML in a DIV (Plone 3.5/4.0 difference)
         * @param {String} reviewStateClass name on the CSS class related to item review state
         * @param {String} contentTypeClass name on the CSS class related to item content type
         */
        var makeSubelement = function (data, wrapper, withImage, wrapDiv, reviewStateClass, contentTypeClass) {
            var newE = $('<a href="' + data.url + '" title="' + data.description + '">' +
                    (withImage ? '<img alt="' + data.type + '" width="16" height="16" src="' + data.icon + '"/>&nbsp;' : '') +
                    '<span>' + data.title + '</span></a>');
            if (reviewStateClass) {
                newE.addClass("state-" + data.review_state_normalized);
            }
            if (contentTypeClass) {
                newE.addClass("contenttype-" + data.type_normalized);
            }
            return wrapper.append(wrapDiv ? $('<div></div>').append(newE) : newE);
        };
        
        /**
         * Get a class (commonly navTreeLevelX) from a jQuery element and rise X to be X+1.
         * Check are done to be sure that X is an integer. The procedure change the jQuery element
         * inline and don't return anything.
         * @param {jQuery} element the jQuery element on which rise the class
         * @param {String} class the class name (if it isn't navTreeLevelX)
         */
        var riseNavigatorClass = function (element, className) {
            var classes = element.attr('class').split(" "), i;
            if (!className) {
                className = "navTreeLevel";
            }
            for (i = 0; i < classes.length; i++) {
                if (classes[i].indexOf(className) === 0 && classes[i].length === className.length + 1) {
                    var c = classes[i].charAt(classes[i].length - 1);
                    if (!isNaN(c)) {
                        element.removeClass(className + c).addClass(className + (parseInt(c, 10) + 1));
                    }
                }
            }
        };
    
    
        /**
         * Apply to the element the toggle feature
         * @param {Integer} index iteration index
         * @param {Object} value can be part of a link url (like "/foo/foo1") but also a jQuery selector
         */
        var makeDynamicElements = function (index, value) {
            var elements = null;
            
            // try to obtain something from the value as jQuery selector
            try {
                elements = $(value);
                if (elements.length === 0) {
                    elements = null;
                }
            } catch (e) {};
    
            // in that case, only a path was provided
            if (!elements) {
                if ($.collective_navigationtoggle.toggleContainerClasses) {
                    elements = $([]);
                    $.each($.collective_navigationtoggle.toggleContainerClasses, function (index, cssClass) {
                        elements = elements.add("." + cssClass + " a[href$='" + escape(value) + "']");
                    });
                } else {
                    elements = $("a[href$='" + escape(value) + "']");
                }
            }

            elements.each(function () {
                var control = $(this);
                var main_elem = control.closest($.collective_navigationtoggle.listItem);
                if (main_elem.data("cnavMarker")) {
                    return;
                }
                // mark this element to prevent further call to makeDynamicElements
                main_elem.data('cnavMarker', true);
                var wrapDiv = control.parent().is('div'); // For handle Plone3.3 and 4 theme difference
                var ul_model = main_elem.closest($.collective_navigationtoggle.listType).clone(false).addClass('cnavGenerated').empty();
                var a_model = main_elem.find('a');
                var li_model = main_elem.clone(false).empty();
        
                // For themes (like Sunburst) that may add additional classes to elements
                var aModelClasses = []; 
                if (a_model.attr("class")) {
                    aModelClasses = a_model.attr("class").split(" ");
                }
                var aReviewStateClass = null;
                var aContentTypeClass = null;
                $.each(aModelClasses, function (index, value) {
                    var regexpReview = /^state\-/;
                    if (regexpReview.test(value)) {
                        aReviewStateClass = value.replace("state-", "");
                    }
                    var regexpContenType = /^contenttype\-/;
                    if (regexpContenType.test(value)) {
                        aContentTypeClass = value.replace("contenttype-", "");
                    }
                });
         
                // Check the right CSS class to be given to the main element
                if (main_elem.children(":last").is($.collective_navigationtoggle.listType)) {
                    main_elem.addClass('cnavOpen');
                } else {
                    main_elem.addClass('cnavClosed');
                } 
                control.bind("click",
                        {main_elem: main_elem, ul_model: ul_model, li_model: li_model,
                         control: control, wrapDiv: wrapDiv,
                         reviewStateClass: aReviewStateClass,  contentTypeClass: aContentTypeClass
                        },
                        checkClick);
    
            });
        };
    
    
        /**
         * Simple function that perform the whole check for every possible navigation elements
         * needing toggle feature.
         */
        var checkDOM = function () {
            $.each($.collective_navigationtoggle.toggle_elements, makeDynamicElements);
        };
    
    
        /**
         * Click handler to be used on expasible/collapsible navigation elements.
         * @param {Event} event jQuery event object, containing the data structure
         */
        var checkClick = function (event) {
            var new_ul;
            // Load data from event
            var main_elem = event.data.main_elem;
            var ul_model = event.data.ul_model;
            var li_model = event.data.li_model;
            var wrapDiv = event.data.wrapDiv;
            var control = event.data.control;
            // optional element classes
            var reviewStateClass = event.data.reviewStateClass;
            var contentTypeClass = event.data.contentTypeClass;
            // cache?
            var cache = $.collective_navigationtoggle.cache;
            
            if (main_elem.hasClass('cnavClosed')) {
                // check if the subtree is in the cache
                if (cache && main_elem.data('cnavCache')) {
                    new_ul = main_elem.data('cnavCache');
                    main_elem.append(new_ul);
                    checkDOM();
                    if ($.collective_navigationtoggle.slide_animation > 0) {
                        new_ul.slideDown($.collective_navigationtoggle.slide_animation, function () {
                            main_elem.removeClass('cnavClosed').addClass('cnavOpen');
                        });                    
                    } else {
                        main_elem.removeClass('cnavClosed').addClass('cnavOpen');
                        new_ul.show();
                    }
                } else {
                    main_elem.removeClass('cnavClosed').addClass('cnavOpen');
                    new_ul = ul_model.clone().hide();
                    main_elem.append(new_ul);
                    riseNavigatorClass(new_ul);
                    // Fill the new element
                    $.getJSON(call_context + '@@query-subelements',
                            {'path': $('a', main_elem).attr('href'),
                             'foo': loading_time}, // for cache prevention management
                            function (data) {
                                $.each(data, function (index, value) {
                                    new_ul.append(makeSubelement(value, li_model.clone(), value.icon,
                                                                 wrapDiv, reviewStateClass, contentTypeClass));
                                });
                                // If no element returned from the subtree, perform normal browser action
                                if ($($.collective_navigationtoggle.listItem, new_ul).length === 0) {
									var static_href = null;
									if (control.is('a')) {
										static_href = control.attr('href');
									} else {
										// in the control is not on a link, let's twy to see in is contained in a link
										static_href = control.closest('a').attr('href');
									}
                                    if (static_href) {
										$.collective_navigationtoggle._goTo(static_href);
									}
                                    return;
                                }
                                // I call this to obtain something like jQuery.live() feature...
                                checkDOM();
                                // Caching for later clicks
                                if (cache) {
                                    // As far as I'm not sure to rely on jQuery 1.4, I can't use the clone() withDataAndEvents
                                    main_elem.data('cnavCache', new_ul.clone(false));                                
                                }
                                // effects?
                                if ($.collective_navigationtoggle.slide_animation > 0) {
                                    new_ul.slideDown($.collective_navigationtoggle.slide_animation);
                                } else {
                                    new_ul.show();
                                }
                            }
                    );
                }
                event.preventDefault();                
            }
            else if (main_elem.hasClass('cnavOpen')) {
                new_ul = main_elem.children(":last");
                if ($.collective_navigationtoggle.slide_animation > 0) {
                    new_ul.slideUp($.collective_navigationtoggle.slide_animation, function () {
                        new_ul.remove();
                        main_elem.removeClass('cnavOpen').addClass('cnavClosed');
                    });                
                } else {
                    new_ul.remove();
                    main_elem.removeClass('cnavOpen').addClass('cnavClosed');
                }
                
                event.preventDefault();
            }
        };

        checkDOM();
		
		$(document).bind('checkDOM.navigationtoggle', function() {
			checkDOM();
		})

    });
})(jQuery);
