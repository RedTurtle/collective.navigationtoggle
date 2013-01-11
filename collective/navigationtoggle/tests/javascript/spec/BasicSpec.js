describe("Basic toggle navigation features", function() {

	var test1_navigation;

	beforeEach(function() {
		test1_navigation = $('#test1 dl').clone();
		$.collective_navigationtoggle.toggle_elements = [];
	});
	
	afterEach(function() {
		$('#test1').empty().append(test1_navigation);		
	});

	it("should set the cnavClosed CSS class", function() {
		$.collective_navigationtoggle.toggle_elements.push('/test')
		$(document).trigger('checkDOM');
		expect($.trim($('#test1 .navTree .cnavClosed').text())).toBe('Test');
	});

	it("should set the cnavOpen CSS class", function() {
		spyOn($, "getJSON");
		$.collective_navigationtoggle.toggle_elements.push('/test')
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($.trim($('#test1 .navTree .cnavOpen').text())).toBe('Test');
	});

	it("should call @@query-subelements view", function() {
		spyOn($, "getJSON");
		$.collective_navigationtoggle.toggle_elements.push('/test')
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($.getJSON.mostRecentCall.args[0]).toEqual("/@@query-subelements");
	});

	it("should pass parameters related to /test folder", function() {
		spyOn($, "getJSON");
		$.collective_navigationtoggle.toggle_elements.push('/test')
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($.getJSON.mostRecentCall.args[1]['path']).toEqual("/Plone/test");
	});

	it("should pass parameters related to \"/test folder\" (with whitespaces)", function() {
		spyOn($, "getJSON");
		$.collective_navigationtoggle.toggle_elements.push('/test folder')
		$(document).trigger('checkDOM');
		$('#test1 .navTree .cnavClosed a').click();
		expect($.getJSON.mostRecentCall.args[1]['path']).toEqual("/Plone/test%20folder");
	});

});