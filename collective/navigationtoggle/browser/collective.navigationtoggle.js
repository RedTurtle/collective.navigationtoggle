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


jq(document).ready(function(){
	jq.each(jq.collective_navigationtoggle.toggle_elements, function(index, value) {
		var main_elem = jq(".portletNavigationTree a[href$="+value+"]").parent().addClass('cnavClosed');
		var ul_model = main_elem.parents('ul:first').clone().empty();
		var li_model = main_elem.parents('li:first').clone().empty();
		main_elem.click(function(event) {
			if (main_elem.hasClass('cnavClosed') && !main_elem.next().is("ul")) {
				new_ul = ul_model.clone().append(li_model.clone().append('abcd'));
				main_elem.after(new_ul)
						.removeClass('cnavClosed').addClass('cnavOpen');
			}
			else if (main_elem.hasClass('cnavOpen')) {
				main_elem.next().remove().end()
						.removeClass('cnavOpen').addClass('cnavClosed');
			};
			event.preventDefault();
		})
	});
})

jQuery.collective_navigationtoggle['toggle_elements'].push("/test/folder-a");
