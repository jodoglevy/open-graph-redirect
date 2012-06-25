$(function() {
    replaceOpenGraphTags();
    $(document).bind("DOMSubtreeModified",replaceOpenGraphTags);
});

function replaceOpenGraphTags() {
    $('a[href*="connect/uiserver.php"]').each(function(index, element) {
        var redirectURI = getURLParameterByName($(element).attr('href'),"redirect_uri");
        
        if(redirectURI) {
            $(element).attr("href",redirectURI);
            $(element).removeAttr("rel");
            $(element).attr("target","_blank");        
        }
    });
}


function getURLParameterByName(url, name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(url);

  if(results == null) return null;
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}
