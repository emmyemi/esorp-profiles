// Generates a page-blocking NSFW warning
// Embed (src="/nsfw.js") this script somewhere in the BODY of your page
const nsfw = document.createElement('div');
nsfw.setAttribute('id','nsfw_overlay');
nsfw.innerHTML = `<style>body{overflow:hidden!important;}div#nsfw_overlay{padding:1em;width:calc(100% - 2em);height:calc(100% - 2em);position:fixed;top:0;left:0;background-color:#111;color:#fff;z-index:6969;}#nsfw_overlay div.nsfw_h1{width:100%;display:block;margin:20% 0 0;font-size:1.75em;text-align:center;font-weight:normal;}#nsfw_overlay div.nsfw_p{width:100%;display:block;text-align:center;font-size:1.1em;margin:.5em 0 0;font-weight:lighter;}#nsfw_overlay span.nsfw_a{cursor:pointer;color:#f55;}#nsfw_overlay span.nsfw_a:hover{text-decoration:underline;}</style>
<div class="nsfw_h1">This page may contain explicit content.</div>
<div class="nsfw_p">If you understand and consent to viewing such content, <span class="nsfw_a" onclick="closeOverlay()">click here to continue</span>.</div>`;
var showOverlay = () =>{ document.body.appendChild(nsfw); },
    closeOverlay = () =>{ nsfw.outerHTML = ''; };
window.addEventListener('DOMContentLoaded', showOverlay);
