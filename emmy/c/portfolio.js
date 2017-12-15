var scrollElem,
adjustHead = (h) => {
  h.style.height = `${window.innerHeight - 1}px`;
},
doParallax = () => {
  scrollElem[0].style.backgroundPosition = `center calc(100% - ${window.scrollY * .2}px)`;
  scrollElem[1].style.backgroundPosition = `center calc(100% - ${window.scrollY * .2}px)`;
},
initParallax = () => {
  scrollElem = document.querySelectorAll('#h_bg, #h_separator');
  window.addEventListener('scroll', doParallax);
},
// * * *
pageLoad = () => {
  if (document.querySelector('#h.big')) {
    adjustHead(document.querySelector('#h.big'));
    window.addEventListener('resize', adjustHead);
  }
  if (!document.querySelector('#h.no_banner')) {
    initParallax();
  }
};
// * * *
window.addEventListener('DOMContentLoaded', pageLoad);
