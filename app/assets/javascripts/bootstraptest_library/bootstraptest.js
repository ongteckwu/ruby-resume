$(document).ready(function() {
	//hackish way to prevent vertical scrolling
	$(document).scroll(function(){
		//maintain scrollLeft at 0
		$(this).scrollLeft(0);
	})
	$(".tab-panel").click(function() {
	});

	$(".read-more").click(function(event) {
		event.preventDefault();
		$(this).toggle()
			   .prev(".truncated-blog-post").toggle();
		$(this).next(".blog-post").toggleClass("blog-post-show");
	});

	$(".read-less").click(function(event) {
		event.preventDefault();
		var $parent = $(this).parent();
		$parent.toggleClass("blog-post-show");
		$parent.prev().toggle()
			   .prev().toggle();

	});
});

