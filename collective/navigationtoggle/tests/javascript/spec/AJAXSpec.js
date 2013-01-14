describe("AJAX related toggle navigation features", function() {

	var test1_navigation, count_call;

	beforeEach(function() {
		test1_navigation = $('#test1 dl').clone();
		count_call = 0;
		$.collective_navigationtoggle.toggle_elements = [];
		$.collective_navigationtoggle.cache = true;
		spyOn($, "getJSON").andCallFake(function(query, params, callback) {
			count_call++;
			if (params['path'] == '/Plone/test') {
				var data = [{
					"review_state_normalized": "published",
					"description": "",
					"type_normalized": "document",
					"url": "/Plone/test/pagina-2",
					"title": "Pagina 2",
					"type": "Document",
					"icon": "/Plone/"
				}, {
					"review_state_normalized": "published",
					"description": "",
					"type_normalized": "folder",
					"url": "/Plone/test/subtest",
					"title": "Subtest",
					"type": "Folder",
					"icon": "/Plone/"
				}];
				callback(data);
			}
			else 
				if (params['path'] == '/Plone/test/subtest') {
					var data = [{
						"review_state_normalized": "published",
						"description": "",
						"type_normalized": "link",
						"url": "/Plone/test/subtest/repubblica",
						"title": "Repubblica",
						"type": "Link",
						"icon": "/Plone/"
					}];
					callback(data);
				}
				else 
					if (params['path'] == '/Plone/test%20folder') {
						var data = [{
							"review_state_normalized": "published",
							"description": "",
							"type_normalized": "document",
							"url": "/Plone/test%20folder/pagina-3",
							"title": "Pagina 2",
							"type": "Document",
							"icon": "/Plone/"
						}];
						callback(data);
					}
				else 
					if (params['path'] == '/Plone/test-empty') {
						var data = [];
						callback(data);
					}
		});
		spyOn($.collective_navigationtoggle, '_goTo');
	});
	
	afterEach(function() {
		$('#test1').empty().append(test1_navigation);	
	});

	it("should populate with sub objects", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test');
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($('#test1 .navTree .cnavOpen .navTreeLevel1').length).toEqual(1);
		var subelements = $('#test1 .navTree .cnavOpen .navTreeLevel1 a');
		expect($(subelements[0]).attr('href')).toEqual('/Plone/test/pagina-2');
		expect($(subelements[1]).attr('href')).toEqual('/Plone/test/subtest');
	});

	it("should populate with sub objects (whitespace ids supported)", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test folder');
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($('#test1 .navTree .cnavOpen .navTreeLevel1').length).toEqual(1);
		var subelements = $('#test1 .navTree .cnavOpen .navTreeLevel1 a');
		expect($(subelements[0]).attr('href')).toEqual('/Plone/test%20folder/pagina-3');
	});

	it("should manage caching of sub objects", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test');
		$(document).trigger('checkDOM');
		// open
		$('#test1 .navTree .cnavClosed a').click();
		// close
		$('#test1 .navTree .cnavOpen a').click();
		// re-open
		$('#test1 .navTree .cnavClosed a').click();
		var subelements = $('#test1 .navTree .cnavOpen .navTreeLevel1 a');
		expect($(subelements[0]).attr('href')).toEqual('/Plone/test/pagina-2');
		expect($(subelements[1]).attr('href')).toEqual('/Plone/test/subtest');
		expect(count_call).toBe(1);
		// let's disable cache
		$.collective_navigationtoggle.cache = false;
		count_call = 0;
		// close
		$('#test1 .navTree .cnavOpen a').click();
		// re-open
		$('#test1 .navTree .cnavClosed a').click();
		expect(count_call).toBe(1);
	});

	it("should populate sub objects and oobjects inside subojects", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test');
		$.collective_navigationtoggle.toggle_elements.push('/test/subtest');
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		$('#test1 .navTree .cnavOpen .navTreeLevel1 a').click();
		expect(count_call).toBe(2);
		var subelements = $('#test1 .navTree .cnavOpen .navTreeLevel2 a');
		expect(subelements.length).toBe(1);
		expect(subelements.attr('href')).toEqual('/Plone/test/subtest/repubblica');
	});

	it("should manage caching of both sub objects and childs", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test');
		$.collective_navigationtoggle.toggle_elements.push('/test/subtest');
		$(document).trigger('checkDOM');
		// open
		$('#test1 .navTree .cnavClosed a').click();
		// close
		$('#test1 .navTree .cnavOpen a').click();
		// re-open
		$('#test1 .navTree .cnavClosed a').click();
		// open sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 a').click();
		// close sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 .cnavOpen a').click();
		// re-open sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 a').click();
		expect(count_call).toBe(2);		
		// let's disable cache
		$.collective_navigationtoggle.cache = false;
		count_call = 0;
		// close all
		$('#test1 .navTree .cnavOpen a').click();
		// open
		$('#test1 .navTree .cnavClosed a').click();
		// close
		$('#test1 .navTree .cnavOpen a').click();
		// re-open
		$('#test1 .navTree .cnavClosed a').click();
		// open sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 a').click();
		// close sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 .cnavOpen a').click();
		// re-open sub-section
		$('#test1 .navTree .cnavOpen .navTreeLevel1 a').click();
		expect(count_call).toBe(4);
	});

	it("should go to link HREF if folder is empty", function() {
		$.collective_navigationtoggle.toggle_elements.push('/Plone/test-empty');
		$(document).trigger('checkDOM');
		$('#test1 .navTree .section-test-empty a').click();
		expect($.collective_navigationtoggle._goTo).toHaveBeenCalledWith("/Plone/test-empty");
	});

	it("should go to link HREF if folder is empty and selector match a link's inner node", function() {
		$.collective_navigationtoggle.toggle_elements.push('li.navTreeItem a.contenttype-folder span');
		$(document).trigger('checkDOM');
		$('#test1 .navTree .section-test-empty a span').click();
		expect($.collective_navigationtoggle._goTo).toHaveBeenCalledWith("/Plone/test-empty");
	});

});