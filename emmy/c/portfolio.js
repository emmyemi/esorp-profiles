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
insFooter = () => {
  var footer = document.createElement('div'),
      artists = document.head.getAttribute('data-art').split(', '),
      artCredit = '',
      artFunc = () => {
        let artNum = artists.length / 2;
        for (i = 0; i < artNum; i++) {
          artCredit += `, <a href="${artists[(i * 2) + 1]}">${artists[i * 2]}</a>`;
        }
        artCredit = artCredit.substr(2);
      };
  artFunc();
  footer.setAttribute('id', 'f');
  footer.innerHTML =`
    Artwork: ${artCredit}<br />
    Website &copy; Emmy
  `;
  document.body.appendChild(footer);
}
// * * *
pageLoad = () => {
  if (document.querySelector('#h.big')) {
    adjustHead(document.querySelector('#h.big'));
    window.addEventListener('resize', adjustHead);
  }
  if (!document.querySelector('#h.no_banner')) {
    initParallax();
  }
  insFooter();
};
// * * *
window.addEventListener('DOMContentLoaded', pageLoad);
