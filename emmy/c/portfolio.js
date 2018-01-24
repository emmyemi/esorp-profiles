var scrollElem,
    isDOMContentLoaded,
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
      artists,
      artCredit = 'Artwork: ',
      isArtCredit = false,
      artFunc = () => {
        if (isArtCredit) {
          let artNum = artists.length / 2;
          for (i = 0; i < artNum; i++) {
            if (i == 0) {
              artCredit += `<a href="${artists[(i * 2) + 1]}">${artists[i * 2]}</a>`;
            } else {
              artCredit += `, <a href="${artists[(i * 2) + 1]}">${artists[i * 2]}</a>`;
            }
          }
          return artCredit;
        } else {
          return '';
        }
      };
  if (document.head.getAttribute('data-art')) {
    artists = document.head.getAttribute('data-art').split(', ');
    artFunc();
    isArtCredit = true;
  }
  footer.setAttribute('id', 'f');
  footer.innerHTML =`
    ${artFunc()}
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
  if (document.querySelector('head[data-theme]') != null) {
    setTheme();
  }
  insFooter();
  initParallax();
};
// * * *
window.addEventListener('DOMContentLoaded', pageLoad);
