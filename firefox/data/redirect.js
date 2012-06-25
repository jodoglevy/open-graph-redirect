function getURLParameterByName(url, name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(url);

  if(results == null) return null;
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}


function replaceOpenGraphTags() {
	var links, numLinks, i, redirectURI;

	links = document.querySelectorAll('a[href*="connect/uiserver.php"]');
	numLinks = links.length;

	for (i = 0; i < numLinks; i++) {
		redirectURI = getURLParameterByName( links[i].getAttribute('href'), "redirect_uri");
		if (redirectURI) {
            links[i].setAttribute('href', redirectURI);
            links[i].removeAttribute('rel');
            links[i].setAttribute('target', '_blank');
        }
	}

}

function checkForOpenGraphOAuth() {
    if(document.URL.indexOf("dialog/oauth") !== -1) {
        var redirectURI = getURLParameterByName( document.URL, "redirect_uri");
        var scope = getURLParameterByName( document.URL, "scope");

        if(redirectURI && scope && scope.indexOf("publish_actions") !== -1) {        
            window.location = redirectURI;
        }
    }
}


checkForOpenGraphOAuth();

document.addEventListener('DOMContentLoaded', function (evt) {

	replaceOpenGraphTags();
	document.addEventListener('DOMSubtreeModified', replaceOpenGraphTags, false);

}, false);


