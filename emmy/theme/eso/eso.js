var esoThemeScroll = () => {
  document.body.style.backgroundPositionY = ((window.scrollY / 30) + 'px')
}
document.body.addEventListener('scroll', esoThemeScroll);
