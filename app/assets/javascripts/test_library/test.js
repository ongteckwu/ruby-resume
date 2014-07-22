$(document).ready(function() {
	var s = skrollr.init();
	//scale, left, top
	cloud_scale = [1.6, 1.5, 1.55, 0.8, 1.33,
  				   0.8, 2, 2.1, 1.4, 1.9,
  				   0.9, 2.5, 0.6, 1.5, 1.4,
  				   1.8, 1.7, 0.86, 1.3, 1.8];
	for (var i = 0; i < cloud_scale.length; i++) {
		$('#cloud' + (i + 1)).transition({scale: [cloud_scale[i], 
								   				  cloud_scale[i]],
						   				  duration: 0});


	}

});