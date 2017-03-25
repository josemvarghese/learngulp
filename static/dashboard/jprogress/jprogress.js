(function($) {
    // start writing function
    $.fn.jprogress = function(options) {
        
        // settings
        var settings = $.extend({
            animateTime: 2000,
            background: '#636363'
        }, options);
        
        // return everytime when plugin function get called
        return this.each(function() {
            
            // define plugin obj
            var mainobj = $(this);
            
            // create method
            progressmethod = {
                //progress init
                init: function(bar) {
                    if(bar != 'undefined') {
                        $(mainobj).addClass('progress_single');
                        $(mainobj).wrap('<div class="progress_single_wrapper"></div>');
                        $(mainobj).css("background", settings.background);
                    }
                }
            };
            
            //check if object is exist
            if(mainobj.length > 0) {
                // call init method
                progressmethod.init();
                
                // get progress percent
              /* 
                $(mainobj).html('<span>Phone&nbsp;'+percent+'</span>');
                $(mainobj).children("span").css("opacity", "0");      */          
                                
                // animate progress bars
                


                 var percent = $(mainobj).attr('progress');
                $(mainobj).animate({width: percent }, settings.animateTime, function() {
                   // console.log(mainobj);
                    $(mainobj).children("span").css("opacity", "1");  
                });
                 
            }
            
        });
    }
}(jQuery));