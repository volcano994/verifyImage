var express = require('express');
var router = express.Router();

var processImage = require('./common/getImage');
var request = require('request');

router.post('/getVerifyImage', (req, res) => {
  let appid = req.body.appid;
  let index = 0;
  console.log(req.session.imageIndex)
  if (req.session.imageIndex) {
    index = (req.session.imageIndex + 1) > 3 ? 3 : (req.session.imageIndex + 1);
  } else {
    req.session.imageIndex = 1;
    index = 1;
  }
  request.post('http://chuanshi.sdo.com/Public/GV/Coordinate.ashx', {
    form: {
      "appid": appid
    }
  }, function (error, response, body) {
    var info = JSON.parse(body);
    processImage(info,index).then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err)
    })
  })
})

module.exports = router;