/**
 * The collective.navigationtoggle Javascript source
 */

jQuery.collective_navigationtoggle = {
	/**
	 * Store there all references to navigation elements that must be made
	 * expansible/collapsible.
	 */
	toggle_elements: new Array()
};


jq(document).ready(function() {

	var call_context = jq("head base").attr('href');

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
	
	jq.each(jq.collective_navigationtoggle.toggle_elements, function(index, value) {
		jq(".portletNavigationTree a[href$="+value+"]").live("click", function(event) {
			var main_elem = jq(this).parents("li:first");
			var ul_model = main_elem.parents('ul:first').clone().addClass('cnavGenerated').empty();
			var li_model = main_elem.clone().removeClass('cnavClosed').empty();
			if (!main_elem.hasClass('cnavOpen')) main_elem.addClass('cnavClosed');
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
						}
				);
				event.preventDefault();
			}
			else if (main_elem.hasClass('cnavOpen')) {
				main_elem.children(":last").remove().end()
						.removeClass('cnavOpen').addClass('cnavClosed');
				event.preventDefault();
			};
		})
	});
})

jQuery.collective_navigationtoggle['toggle_elements'].push("/site/new-area");
jQuery.collective_navigationtoggle['toggle_elements'].push("/site/new-area/abc");
