const express = require('express');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl');

const router = express.Router();

// Routes

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'url_error.html'));
});

// :url is a request parameter e.g: (http://localhost:5000/index.html/send-url/https://example.com)
router.get('/:url', (req, res) => {
  const url = req.params.url

  const video = youtubedl(url);
  video.on('info', info => {
    console.log('Download started');
    console.log(`title: ${info.title}`);
    console.log(`url: ${info.url}`);
    console.log('-----------------------------');
    console.log(`filename: ${info._filename}`);
    console.log(`size: ${info.size}`);
    console.log(`format id: ${info.format_id}`);
  });
  
  video.pipe(fs.createWriteStream('video.mp4'));

  const videoFilePath = path.join(__dirname, 'video.mp4');

  res.download(videoFilePath, (err) => {
    if (!err) {
      fs.unlink(videoFilePath);
    } else {
      console.error(err);
    }
  });
});

module.exports = router;