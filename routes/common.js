var express = require('express');
var router = express.Router();

var processImage = require('./common/getImage');
var request = require('request');

router.post('/getVerifyImage', (req, res) => {
  let appid = req.body.appid;
  let imageIndex = req.body.imageIndex;
  request.post('http://chuanshi.sdo.com/Public/GV/Coordinate.ashx', {
    form: {
      "appid": appid
    }
  }, function (error, response, body) {
    var info = JSON.parse(body);
    processImage(info,imageIndex).then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err)
    })
  })
})

module.exports = router;