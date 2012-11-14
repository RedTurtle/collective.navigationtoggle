describe("Basic toggle navigation features", function() {

  it("should set the cnavClosed CSS class", function() {
  	$.collective_navigationtoggle.toggle_elements.push('/test')
    $(document).trigger('checkDOM');
	expect($.trim($('#test1 .navTree .cnavClosed').text())).toBe('Test');
  });

  it("should set the cnavOpen CSS class", function() {
  	spyOn($, "getJSON");
  	$.collective_navigationtoggle.toggle_elements.push('/test')
	$(document).trigger('checkDOM');
	var link = $('#test1 .navTree .cnavClosed a');
	link.click();
	expect($.trim($('#test1 .navTree .cnavOpen').text())).toBe('Test');
  });

  it("should pass parameters related to /test folder", function() {
  	spyOn($, "getJSON");
  	$.collective_navigationtoggle.toggle_elements.push('/test')
	$(document).trigger('checkDOM');
	var link = $('#test1 .navTree .cnavClosed a');
	link.click();
	expect($.getJSON.mostRecentCall).toEqual("/products/123");
  });

});