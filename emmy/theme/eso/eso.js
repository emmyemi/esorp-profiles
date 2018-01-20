var esoThemeScroll = () => {
  document.body.style.backgroundPositionY = `calc(100% - ${window.scrollY / 30}px)`;
};
window.addEventListener('scroll', esoThemeScroll);
