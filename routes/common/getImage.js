const {
  createCanvas,
  loadImage
} = require('canvas');

var processImage = function (info, imageIndex) {
  return new Promise(function (reslove, reject) {
    try {
      let canvas = createCanvas(300, 280);
      let ctx = canvas.getContext('2d');
      let cutCanvas = createCanvas(50, 50);
      let cutCtx = cutCanvas.getContext('2d');
      loadImage('./images/test-img-0' + imageIndex + '.jpg').then(image => {
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(info.x, info.y, 50, 50);
        cutCtx.drawImage(image, info.x, info.y, 50, 50, 0, 0, 50, 50);
        var result = {
          'origin': canvas.toDataURL(),
          'cut': cutCanvas.toDataURL(),
          'y': info.y,
          'vkey': info.vkey
        }
        reslove(result)
      })
    } catch (err) {
      reject(err);
    }
  })
}

module.exports = processImage;