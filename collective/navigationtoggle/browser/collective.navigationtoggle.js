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
	 * Elements must be HREF trailer, that will be looked inside every A elements of
	 * navigations.
	 */
	toggle_elements: new Array()
};


jq(document).ready(function() {

	/**
	 * Context URL to be used for all AJAX call
	 */
	var call_context = jq("head base").attr('href');
	if (call_context.charAt(call_context.length-1)!='/') call_context=call_context+'/';

	/*
	 * Don't want to call the context when is in the portal factory. See the Ale's blog post:
	 * http://blog.redturtle.it/redturtle-blog/2010/03/11/careful-with-that-ajax-eugene
	 */
	if (call_context.indexOf('/portal_factory')>-1) {
		call_context=call_context.substring(0,call_context.indexOf('/portal_factory')+1);
	}

	/**
	 * Generate a new navigation element
	 * @param {Object} data structure to be used for filling the element
	 * @param {jQuery} wrapper a wrapper element to be used as container
	 */
	var makeSubelement = function(data, wrapper) {
		return wrapper.append('<div><a href="'+data.url+'" title="'+data.description+'">' +
					'<img alt="'+data.type+'" width="16" height="16" src="'+data.icon+'"/>' +
					'<span>'+data.title+'</span></a></div>');
	}
	
	/**
	 * Get a class (commonly navTreeLevelX) from a jQuery element and rise X to be X+1.
	 * Check are done to be sure that X is an integer. The procedure change the jQuery element
	 * inline and don't return anything.
	 * @param {jQuery} element the jQuery element on which rise the class
	 * @param {String} class the class name (if it isn't navTreeLevelX)
	 */
	var riseNavigatorClass = function(element, className) {
		if (!className) className = "navTreeLevel";
		classes = element.attr('class').split(" ");
		for (var i=0;i<classes.length;i++) {
			if (classes[i].indexOf(className)==0 && classes[i].length==className.length+1) {
				var c = classes[i].charAt(classes[i].length-1);
				if (!isNaN(c)) element.removeClass(className+c).addClass(className+(parseInt(c)+1));
			}
		}
	}
	
	/**
	 * A function to be called with jQuery.each(). Check all element defined in the
	 * toggle_elements, then apply to them the "toggle" feature.
	 * @param {Object} index iteration index
	 * @param {Object} value current element
	 */
	var makeDynamicElements = function(index, value) {
		var control = jq(".portletNavigationTree a[href$="+value+"]");
		if (control.length==0) return;
		var main_elem = control.parents("li:first");
		if (main_elem.hasClass('cnavClosed') || main_elem.hasClass('cnavOpen')) return;
		var ul_model = main_elem.parents('ul:first').clone().addClass('cnavGenerated').empty();
		var li_model = main_elem.clone().empty();
		// Check the right CSS class to be given to the main element
		if (main_elem.children(":last").is("ul")) main_elem.addClass('cnavOpen');
		else main_elem.addClass('cnavClosed');
		control.bind("click", {main_elem: main_elem, ul_model:ul_model, li_model:li_model},
				checkClick);
	};
	
	/**
	 * Click handler to be used on expasible/collapsible navigation elements.
	 * @param {Event} event jQuery event object, containing the data structure
	 */
	var checkClick = function(event) {
		main_elem = event.data.main_elem;
		ul_model = event.data.ul_model;
		li_model = event.data.li_model;
		if (main_elem.hasClass('cnavClosed')) {
			new_ul = ul_model.clone();
			main_elem.append(new_ul).removeClass('cnavClosed').addClass('cnavOpen');
			riseNavigatorClass(new_ul);
			// Fill the new element
			jq.getJSON(call_context+'@@query-subelements',
					{'path': jq('a', main_elem).attr('href')},
					function(data) {
						jq.each(data, function(index, value) {
							new_ul.append(makeSubelement(value, li_model.clone()));
						});
						// Now we simulate here the jQuery.live feature...
						checkDOM();
					}
			);
			event.preventDefault();
		}
		else if (main_elem.hasClass('cnavOpen')) {
			main_elem.children(":last").remove().end()
					.removeClass('cnavOpen').addClass('cnavClosed');
			event.preventDefault();
		};
	};
	
	/**
	 * Simple function that perform the whole check for every possible navigation elements
	 * that needs toggling feature.
	 */
	var checkDOM = function() {
		jq.each(jq.collective_navigationtoggle.toggle_elements, makeDynamicElements);
	};
	checkDOM();
	
})

// jQuery.collective_navigationtoggle['toggle_elements'].push("/folder-a");
// jQuery.collective_navigationtoggle['toggle_elements'].push("/test/folder-a/folder-a1");
