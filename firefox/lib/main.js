//Facebook Open Graph Redirect
//Credits: Joe Levy and Florian Bersier
const pageMod = require("page-mod");
const data = require("self").data;

exports.main = function() {
    pageMod.PageMod({ 
    include: ["https://www.facebook.com/*","http://www.facebook.com/*"],
    contentScriptWhen: 'ready',
    contentScriptFile: [data.url("redirect.js")]
    });
}
