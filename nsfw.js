// Generates a page-blocking NSFW warning
// Insert or embed (src="/nsfw.js") this script somewhere in the BODY of your page
const nsfw = document.createElement('DIV');
nsfw.setAttribute('id','nsfw_overlay');
nsfw.innerHTML =`
<style>
  body{
    overflow:hidden!important;
  }
  div#nsfw_overlay{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background-color:#111;
    color:#fff;
    z-index:6969;
  }
  #nsfw_overlay div.h1{
    width:100%;
    display:block;
    margin:20% 0 0;
    font-size:1.75em;
    text-align:center;
    font-weight:normal;
  }
  #nsfw_overlay div.p{
    width:100%;
    display:block;
    text-align:center;
    font-size:1.1em;
    margin:.5em 0 0;
    font-weight:lighter;
  }
  #nsfw_overlay span.a{
    cursor:pointer;
    color:#f55;
  }
  #nsfw_overlay span.a:hover{
    text-decoration:underline;
  }
</style>
<div class="h1">This page may contain explicit content.</div>
<div class="p">If you understand and consent to viewing such content, <span class="a" onclick="closeOverlay()">click here to continue</span>.</div>
`;
var showOverlay = () =>{ document.body.appendChild(nsfw); },
    closeOverlay = () =>{ document.getElementById('nsfw_overlay').outerHTML = ''; };
showOverlay();
