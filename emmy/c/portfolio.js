var scrollElem,
    isDOMContentLoaded,
adjustHead = () => {
  let h = document.querySelector('#h.big');
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
setTheme = (theme = document.head.getAttribute('data-theme')) => {
  var themePath = `/emmy/theme/${theme}`,
      themeHref = `/emmy/theme/${theme}/${theme}.css`,
      style = document.createElement('link'),
      result,
      scriptSrc = `${themePath}/${theme}.js`,
      scriptCheck = () => {
        var insScript = () => {
              let script = document.createElement('script');
              script.setAttribute('src', scriptSrc);
              document.body.insertBefore(script, document.querySelector('#h'));
            },
            check = new XMLHttpRequest();
        check.addEventListener('load', function(){ if(check.status == 200){ insScript(); } });
        check.open('GET', scriptSrc);
        check.send();
    };
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  style.setAttribute('href', themeHref);
  document.head.appendChild(style);
  scriptCheck();
},
// * * *
pageLoad = () => {
  if (document.querySelector('#h.big')) {
    adjustHead();
    window.addEventListener('resize', adjustHead);
  }
  if (!document.querySelector('#h.no_banner')) {
    initParallax();
  }
  if (document.querySelector('head[data-theme]') && document.querySelector('head[data-theme]').getAttribute('data-theme') != 'default') {
    setTheme();
  }
  insFooter();
};
// * * *
window.addEventListener('DOMContentLoaded', pageLoad);
