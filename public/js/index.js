$(function() {
	$("#navbar a").click(function(event) {
		event.preventDefault();
		$(this).tab('show');
	});
});