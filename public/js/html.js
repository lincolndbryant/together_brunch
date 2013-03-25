

if (typeof window.templates == 'undefined') window.templates = {}; window.templates['app/templates/artist_popup.hbs'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"blog-item isotope-item artist-popup\">\n	<div class=\"inner\">\n	    <figure>\n	        <a href=\"\" class=\"link-to-post\">\n	            <div class=\"overlay\">\n	                <div class=\"thumb-info\"><i class=\"icon-file-alt\"></i></div>\n	            </div>\n\n	        </a>\n	    </figure>\n	    <div class=\"blog-details-wrap\">\n            <ul class=\"tracks\">\n\n	        </ul>\n\n	        <div class=\"read-more-bar\">\n	            <div class=\"comments-likes\">\n	                <a href=\"http://togetherboston.com/boston-calling/#comment-area\"><i class=\"icon-comments\"></i><span>\n                        <fb:comments-count href=\"http://togetherboston.com/lineup/#";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"/></fb:comments-count>\n	                </span></a>\n	                <div class=\"love-it-wrapper\"><a href=\"#\" class=\"love-it\" data-post-id=\"6795\" data-user-id=\"0\"><i class=\"icon-heart\"></i></a> <span class=\"love-count\">3</span></div>\n	            </div>\n	        </div>\n\n            <div class=\"fb-comments\" data-href=\"http://togetherboston.com/lineup/#";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-width=\"400\" data-num-posts=\"10\"></div>\n            <div class=\"fb-like\" data-send=\"false\" data-layout=\"button_count\" data-width=\"400\" data-href=\"http://togetherboston.com/lineup/#";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-show-faces=\"true\"></div>\n\n\n\n        </div>\n    \n    </div>\n\n\n    <div class=\"triangle\"></div>\n    <div class=\"triangle-inner\"></div>\n</div>";
  return buffer;});

if (typeof window.templates == 'undefined') window.templates = {}; window.templates['app/templates/player.hbs'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "\n		<div id=\"jplayer\" class=\"jp-jplayer\"></div>\n\n		<div id=\"jp_container\" class=\"jp-audio\">\n			<div class=\"jp-controls\">\n				<i href=\"javascript:;\" class=\"jp-play icon-play\" tabindex=\"1\">play</i>\n				<i href=\"javascript:;\" class=\"jp-pause icon-pause\" tabindex=\"1\">pause</i>\n				<i href=\"javascript:;\" class=\"jp-stop icon-stop\" tabindex=\"1\">stop</i>\n			</div>\n			<div class=\"jp-progress\">\n				<span class=\"title\"></span>\n				<div class=\"jp-seek-bar\">\n					<div class=\"jp-play-bar\"></div>\n				</div>\n			</div>\n			<div class=\"jp-volume-bar\">\n				<div class=\"jp-volume-bar-value\"></div>\n			</div>\n			<div class=\"jp-right\">\n				<span class=\"jp-current-time\"></span> / <span class=\"jp-duration\"></span>\n			</div>\n		</div>\n		<div class=\"jp-no-solution\" style=\"display: none\">\n			<span>Update Required</span>\n			To play the media you will need to either update your browser to a recent version or update your <a href=\"http://get.adobe.com/flashplayer/\" target=\"_blank\">Flash plugin</a>.\n		</div>\n	</div>\n";});