/**
 * Jquery Custom input:file
 *
 * @version 1.1.0
 * @author Cristiano T. Fetter (cristiano.fetter@gmail.com)
 */

(function($) {

	$.fn.inputfile = function (config){
		
		if (config == "destroy") {
			this.trigger("destroy");
			return;
		}
		
		var defaults = {
			customOffset: null, //{ top: 0, left: 0 }
			onChange: function(){}
		}; 
		
		return this.each(function(){
			
			var options = $.extend({}, defaults, config), 
				self = $(this), 
				selfTop, 
				selfLeft, 
				newInputFile = $("<input type=\"file\" name=\"" + options.name + "\" class=\"newInputFile\" />"), 
				newInputFileLabel = self; 
			
			//self.append(newInputFileLabel);
			self.attr("name", self.attr("name") + "_placeholder")
			
			//newInputFile.attr("name", self.attr("name"));
			
			if (self.parent().css("position") != "static") {
				selfTop = "0px"; 
				selfLeft = "0px"; 
			} else {
				selfTop = self.offset().top; 
				selfLeft = self.offset().left;
			}
			
			newInputFile.css({
				"position": "absolute", 
				"top": (options.customOffset != null ? options.customOffset.top : selfTop), 
				"left": (options.customOffset != null ? options.customOffset.left : selfLeft), 
				"width": self.innerWidth() + "px", 
				"height": self.innerHeight() + "px", 
				"cursor": "pointer", 
				/* IE 8 */
  				"-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)", 
				/* IE 5-7 */
				"filter": "alpha(opacity=0)", 
				/* Netscape */
				"-moz-opacity": "0", 
				/* Safari 1.x */
				"-khtml-opacity": "0", 
				/* Good browsers */
				"opacity": "0"
			});
			
			newInputFile.bind("change mouseenter mouseleave", function(e){
				
				switch(e.type)
				{
					case "change" : 
						if (newInputFile.val().length > 0) {
							newInputFileLabel.val(
								//"<strong>Arquivo: </strong>" + 
								newInputFile.val().replace("fakepath", "...")
							);
						} else {
							/*newInputFileLabel.html(
								"<b>" + options.placeholder + "</b>"
							);*/
							newInputFileLabel.val('');
						}
					break; 
					case "mouseenter" : 
					case "mouseleave" : 
						self.trigger(e.type); 
					break;
				}
				
				if (e.type == "change"){
					options.onChange();
				}
				
			});
			
			self.parent().append(newInputFile);
			
		});
	}

})(jQuery);

