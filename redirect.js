/*jslint sloppy:true, browser:true, plusplus: true, debug: true */
/*globals chrome */


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


chrome.extension.sendRequest({setIconPath: "icon.png"}, function () {});



document.addEventListener('DOMContentLoaded', function (evt) {

	replaceOpenGraphTags();
	document.addEventListener('DOMSubtreeModified', replaceOpenGraphTags, false);



}, false);


