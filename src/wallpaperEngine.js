function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
      if (properties.backgroundcolor) {
          document.body.style.backgroundColor = rgbToHex(...properties.backgroundcolor.value.split(' ').map(c => { return Math.ceil(c * 255) }));
      }
      if (properties.logocolor) {
        document.querySelector(".logo > svg").style.fill = rgbToHex(...properties.logocolor.value.split(' ').map(c => { return Math.ceil(c * 255) }));
      }
      if (properties.speedx) {
        settings.speed.x = properties.speedx.value;
      }
      if (properties.speedy) {
        settings.speed.y = properties.speedy.value;
      }
      if (properties.logoscale) {
        element.style.height = settings.logo.height * properties.logoscale.value
        element.style.width = settings.logo.width * properties.logoscale.value
      }
  },
  applyGeneralProperties: function(properties) {
      if (properties.fps) {
          settings.fps_limit = properties.fps;
      }
  },
  setPaused: function(isPaused) {
      settings.paused = isPaused;
  }
};