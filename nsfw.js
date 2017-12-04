// Import this somewhere in the BODY of your page

const nsfw = document.createElement('DIV');
nsfw.setAttribute('id','nsfw_overlay');
nsfw.innerHTML =`
<style>
  div#nsfw_overlay{
    width:100%;
    height:100%;
    position:fixed;
    font-style:italic;
    top:0;
    left:0;
    background-color:#111;
    color:#fff;
    z-index:6969;
  }
  #nsfw_overlay h1{
    margin:20% 0 0;
    font-size:1.75em;
    text-align:center;
    font-weight:normal;
  }
  #nsfw_overlay p{
    text-align:center;
    font-size:1.15em;
    margin:.5em 0 0;
  }
  #nsfw_overlay a{
    color:#f55;
  }
</style>
<h1>This page may contain explicit content.</h1>
<p>If you understand and consent to viewing such content, <a href="#" onclick="closeOverlay()">click here to continue</a>.</p>
`;
var closeOverlay = () =>{
  document.getElementById('nsfw_overlay').style.display = 'none';
};
var showOverlay = () =>{
    document.body.appendChild(nsfw);
};
showOverlay();