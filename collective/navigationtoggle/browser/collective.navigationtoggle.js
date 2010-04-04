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
	 */
	var makeSubelement = function(data) {
		return ehtml = '<div><a href="'+data.url+'" title="'+data.description+'">' +
					'<img alt="'+data.type+'" width="16" height="16" src="'+data.icon+'"/>' +
					'<span>'+data.title+'</span></a></div>';
	}
	
	/**
	 * Get a class (commonly navTreeLevelX) from a jQuery element and rise X to be X+1.
	 * @param {jQuery} element the jQuery element on which rise the class
	 * @param {String} class the class name (if it isn't navTreeLevelX)
	 */
	var riseNavigatorClass = function(element, class) {
		// todo
	}
	
	jq.each(jq.collective_navigationtoggle.toggle_elements, function(index, value) {
		var main_elem = jq(".portletNavigationTree a[href$="+value+"]")
				.parents("li:first").addClass('cnavClosed');
		var ul_model = main_elem.parents('ul:first').clone().addClass('cnavGenerated').empty();
		var li_model = main_elem.clone().removeClass('cnavClosed').empty();
		main_elem.click(function(event) {
			if (main_elem.hasClass('cnavClosed')) {
				new_ul = ul_model.clone().append(li_model.clone());
				main_elem.append(new_ul)
						.removeClass('cnavClosed').addClass('cnavOpen');
				// Fill the new element
				jq.getJSON(call_context+'@@query-subelements',
						{'path': jq('a', main_elem).attr('href')},
						function(data) {
							jq.each(data, function(index, value) {
								new_ul.append(makeSubelement(value));
							});
						});
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
