
$(document).ready(function() {
  var s = skrollr.init()
////////// WORD CLOUD /////////////////
  var word_cloud_list = [["Javascript", 22],
                         ["Ruby", 20],
                         ["Python", 25],
                         ["Selenium", 6],
                         ["Pygame", 16],
                         ["SpriteBuilder", 10],
                         ["Algorithms", 7],
                         ["Web Design", 18],
                         ["Web Frameworks", 12],
                         ["GAE", 10],
                         ["Django", 16],
                         ["Rails", 20],
                         ["BDD", 10],
                         ["TDD", 10],
                         ["Rspec", 15],
                         ["JQuery", 17],
                         ["JQuery-UI", 15],
                         ["Skrollr.js", 5],
                         ["CSS", 10],
                         ["HTML", 15],
                         ["HAML", 12],
                         ["Cucumber", 10],
                         ["Objective C", 20],
                         ["iOS", 15],
                         ["XCode", 12],
                         ["Databases", 12],
                         ["Machine Learning", 13],
                         ["Artificial Intelligence", 8],
                         ["Unittest", 5],
                         ["Rapid Prototyping", 6],
                         ["C++", 20],
                         ["C", 12],
                         ["Git", 12],
                         ["Octave", 16],
                         ["Word", 8],
                         ["Excel", 3],
                         ["Virtualenv", 7],
                         ["GAE", 14]];

  var my_canvas = document.getElementById("wordcloud");
  my_canvas.width = 1200;
  my_canvas.height = 600;
  //whether cloud is out already
  var wordcloud_out = false;
  var scrolled = false;
  var progress_bar_100 = $("body").height() - $(window).height();
  $(document).on("scroll", document, function() {
    $(this).scrollLeft(0);
    if (!scrolled) {
      $("#introp_progressbar").css("left", "48.8%");
      scrolled = !scrolled;
    }
    var from_top = $("#wordcloud").offset().top - $(document).scrollTop();
    var bar_percentage = ($(document).scrollTop()/progress_bar_100) * 100;

    //round to 100 if hit 101
    if (bar_percentage < 0) {
      bar_percentage = 0;
    }
    else if (bar_percentage > 100) {
      bar_percentage = 100;
    }
    //String it
    bar_percentage = Math.round(bar_percentage);
    if (bar_percentage === 100) {
      $("#introp_progressbar").css("left", "48.2%");
      scrolled = !scrolled;
    }
    bar_percentage = bar_percentage + "%"
    $("#introp_progressbar").html(bar_percentage);

    if ((from_top < 300 && from_top > -300) 
          && !wordcloud_out) { 
      WordCloud(my_canvas, 
                {list: word_cloud_list,
                 fontFamily: "Futura",
                 weightFactor: 4.5,
                 shape: "square",
                 minSize: 10,
                 rotateRatio: 0.2,
                 wait: 30,
                 backgroundColor : "lightblue"});
      wordcloud_out = !wordcloud_out;
   }

   if ((from_top < -700 || from_top > 700)
        && wordcloud_out) {
    my_canvas.width = 1000;
    wordcloud_out = !wordcloud_out;
   }
  });

////////// CONTENT //////////////
  var content_subclasses = {"about": {"color_start": "#363B7D",
                                      "color_hover": "#1D2060",
                                      "color_content":"lightblue",
                                      "id": 0
                                     },
                            "projects": {"color_start": "#993460",
                                         "color_hover": "#75133E",
                                         "color_content": "#FEEFFF",
                                         "id": 1
                                        },
                            "reading_list": {"color_start": "#72A438",
                                             "color_hover": "#4C7D14",
                                             "color_content": "#D9F8A9",
                                             "id": 2
                                            }
                            /*"test": {"color_start": "B49339",
                                       "color_hover": "7E5F10",
                                       "color_content":"#FF8EFF"}
                           */
                           };
  
  //renders first looks of content boxes
  var contentStart = function(contents, content) {
    var content_div = $("#" + content);

    content_div.css("background-color", contents[content].color_start);
    content_div.css("border", "20px solid " + contents[content].color_start);    
    $('#' + content + '2').css("background-color", contents[content].color_content);
    $('#' + content + '3').css("background-color", contents[content].color_content);
  }; 
  
  //render width of content boxes according to number of elements
  var contentWidth = function(number_of_elements) {
    $("div.content").width(45.0/number_of_elements + "%");
    $("div.content2").width(55.0/number_of_elements + "%");
  };
  
  //accepts a content_subclasses and a content
  var fadeOutDeco = function(contents, content) {
    var fadeOut = function() {
      $(this).fadeTo("fast", 0.7);
      $(this).children("p").css("color", contents[content].color_hover);
      $(this).css("border", "3px solid " + contents[content].color_hover);
    };
    return fadeOut;
  };
  
  var fadeInDeco = function(contents, content) {
    var fadeIn = function() {
      $(this).fadeTo("slow", 1);
      $(this).children("p").css("color", "white");
      $(this).css("border", "20px solid " + contents[content].color_start);
    };
    
    return fadeIn;
  };

  //function for revealing drop
  var clickDropDeco = function(contents, content) {
    var clickDrop = function() {
      var cache_div = $('#' + content + '2');
      var cache_div2 = $('#' + content + '3');  
      
      var action;
      if (contents[content].id === 0) {
        action = "size";
      }
      else if (contents[content].id !== Object.keys(content_subclasses).length - 1) {
        action = "fold";
      }
      else {
        action = "drop";
      } 
      

      //position the drop-down element
      margin_left =  String(contents[content].id * (10 + $('div.content').outerWidth()) + 60);
      cache_div.css("margin-left", margin_left + "px");
      cache_div.show();
      

      cache_div.effect('slide', 
                       {direction: "up"}, 
                       1000, 
                       complete= function() {
                         if (action === "size") {
                         //resize about2, reveal about3, then hide about2                                           
                           cache_div.effect('size',
                                            {to:{width:cache_div2.width()},
                                             scale: "content"
                                             },
                                             1000,
                                             complete= function() {
                                              cache_div.hide();
                                              $("#x1").show()
                                                            .transition({scale: [3, 3], duration: 1500});
                                              cache_div2.show()
                                                        .transition({scale: [2.5, 10],
                                                                     delay: 200,
                                                                     duration: 1000},
                                                                     complete = function() { 
                                                                      //allow scrolling
                                                                      $('body').css("overflow", "auto")
                                                                      //reveal progressbar percentage
                                                                      $('#introp_progressbar').show();
                                                                      $('#click_click').hide();
                                                                     }
                                                                    );
                                             }
                            );
                           }
                         else if (action === "fold") {
                           cache_div.hide('fold', 
                                          {size: "30",
                                           horizFirst: false},
                                          1000,
                                             complete= function() {
                                              cache_div2.show('fold',
                                                              {size: "30"},
                                                             1000);
                                              
                                             });
                         }
                           else if (action === "drop") {
                             cache_div.hide('drop',
                                            {direction: "right"},
                                            1000,
                                            complete= function(){
                                              cache_div2.show('drop',
                                                              {direction: "right"},
                                                             1000);
                                            });
                           }
                       }
        );
      //$("#contentbox").off("click");
      return false;
    };
    return clickDrop;
  };
  
  //set widthbox width according to number of elements
  contentWidth(Object.keys(content_subclasses).length);
  
  for (var k in content_subclasses) {
    contentStart(content_subclasses, k); //div.k
    $("#" + k).hover(fadeOutDeco(content_subclasses, k),
                       fadeInDeco(content_subclasses, k)
                      );
    $(document).one("click", "#" + k, handler= clickDropDeco(content_subclasses, k));

  }

//////////// Parallax clouds set-up //////////////
  cloud_scale = [1.6, 0.7, 1.15, 0.8, 1.33,
             0.8, 2, 0.8, 1.4, 1.2,
             1.2, 0.5, 1.2, 2, 1.4,
             1.5, 1.7, 0.86, 1.3, 1.8];
  for (var i = 0; i < cloud_scale.length; i++) {
    $('#cloud' + (i + 1)).transition({scale: [cloud_scale[i], 
                            cloud_scale[i]],
                        duration: 0});


  }
});

