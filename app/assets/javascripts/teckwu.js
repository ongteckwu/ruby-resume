
$(document).ready(function() {
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
  var content_start = function(contents, content) {
    var content_div = $("div." + content);

    content_div.css("background-color", contents[content].color_start);
    content_div.css("border", "20px solid " + contents[content].color_start);    
    $('div.' + content + '2').css("background-color", contents[content].color_content);
    $('div.' + content + '3').css("background-color", contents[content].color_content);
  }; 
  
  //render width of content boxes according to number of elements
  var content_width = function(number_of_elements) {
    $("div.content").width(50.0/number_of_elements + "%");
    $("div.content2").width(55.0/number_of_elements + "%");
  };
  
  //accepts a content_subclasses and a content
  var fade_out_deco = function(contents, content) {
    var fade_out = function() {
      $(this).fadeTo("fast", 0.9);
      $(this).children("p").css("color", contents[content].color_hover);
      $(this).css("border", "3px solid " + contents[content].color_hover);
    };
    return fade_out;
  };
  
  var fade_in_deco = function(contents, content) {
    var fade_in = function() {
      $(this).fadeTo("slow", 1);
      $(this).children("p").css("color", "white");
      $(this).css("border", "20px solid " + contents[content].color_start);
    };
    
    return fade_in;
  };

  //function for revealing drop
  var click_drop_deco = function(contents, content) {
    var click_drop = function() {
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
      margin_left =  String(contents[content].id * $('div.content').outerWidth() + 30);
      cache_div.css("margin-left", margin_left + "px");
      cache_div.show();
      
      //if first, origin ['top', 'left']
      //if last, origin ['top', 'right']
      //if not, origin ['center', middle']

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
                                              cache_div.css("display", "none");
                                              cache_div2.show();
                                              
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
    return click_drop;
  };
  
  
  //set widthbox width according to number of elements
  content_width(Object.keys(content_subclasses).length);
  
  for (var k in content_subclasses) {
    content_start(content_subclasses, k); //div.k
    $("div.content." + k).hover(fade_out_deco(content_subclasses, k),
                       fade_in_deco(content_subclasses, k)
                      );
    $("div.contentbox").one("click", "div.content." + k, handler= click_drop_deco(content_subclasses, k));
  }

  
   
});

