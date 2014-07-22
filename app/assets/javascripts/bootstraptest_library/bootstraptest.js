$(document).ready(function() {
	//hackish way to prevent vertical scrolling
	$(document).scroll(function(){
		//maintain scrollLeft at 0
		$(this).scrollLeft(0);
	})

});