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
    Website &copy; 2017&ndash;${new Date().getFullYear()} Emmy`;
  document.body.appendChild(footer);
},
setTheme = () => {
  var theme = document.head.getAttribute('data-theme'),
      themePath = `/emmy/theme/${theme}`,
      themeHref = `/emmy/theme/${theme}/${theme}.css`,
      style = document.createElement('link'),
      result,
      scriptSrc = `${themePath}/${theme}.js`,
      scriptCheck = () => {
        var getResult = () => {
              console.log(`XHTTP result: ${this.status}`);
              if (this.status == '200') {
                let script = document.createElement('script');
                script.setAttribute('src', scriptSrc);
                document.querySelector('#h').insertBefore(script);
              }
            };
        let check = new XMLHttpRequest();
        check.addEventListener('load', getResult);
        check.open('GET', scriptSrc);
        check.send();
    };
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  style.setAttribute('href', themeHref);
  document.head.appendChild(style);
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
  if (document.querySelector('head[data-theme]')) {
    setTheme();
  }
  insFooter();
};
// * * *
window.addEventListener('DOMContentLoaded', pageLoad);
