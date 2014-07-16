
$(document).ready(function() {
  var s = skrollr.init()
  var content_subclasses = {"about": {"color_start": "#363B7D",
                                      "color_hover": "#1D2060",
                                      "color_content":"#F0F8FF",
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
    var content_div = $("div.content." + content);

    content_div.css("background-color", contents[content].color_start);
    content_div.css("border", "20px solid " + contents[content].color_start);    
    $('div.' + content + '2').css("background-color", contents[content].color_content);
    $('div.' + content + '3').css("background-color", contents[content].color_content);
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
      var cache_div = $('div.content2.' + content + '2');
      var cache_div2 = $('div.content3.' + content + '3');  
      
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
                                              $(".cloud.x1").show()
                                                            .transition({scale: [3, 3], duration: 1500});
                                              cache_div2.show()
                                                        .transition({scale: [2.5, 2.5],
                                                                     delay: 200,
                                                                     duration: 1000},
                                                                     complete = function() { 
                                                                      //allow scrolling
                                                                      $('body').css("overflow", "auto")
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
      //$("div.contentbox").off("click");
      return false;
    };
    return clickDrop;
  };
  
  //set widthbox width according to number of elements
  contentWidth(Object.keys(content_subclasses).length);
  
  for (var k in content_subclasses) {
    contentStart(content_subclasses, k); //div.k
    $("div.content." + k).hover(fadeOutDeco(content_subclasses, k),
                       fadeInDeco(content_subclasses, k)
                      );
    $("div.contentbox").one("click", "div.content." + k, handler= clickDropDeco(content_subclasses, k));
  }

   
});

