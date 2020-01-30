const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

const router = express.Router();

// Routes

router.get('/', (req, res) => {

  const download = (url, fileName) => {
    res.header('Content-Disposition', `attachment; filename="${fileName}.mp4"`);
    ytdl(
      url,
      {
        quality: 'highest',
        format: 'mp4'
      }
    ).pipe(res);
    return;
  }

  const url = req.query.url
  console.log(url);

  ytdl.getBasicInfo(url).then(
    (info) => {
      console.log(`Title: ${info.title}`);
      console.log(`Author: ${info.author.name}`);
      return info;
    }
  ).then((info) => {
    download(url, `${info.title}.mp4`);
  }).catch((err) => {
    if (err.code === 'ERR_INVALID_CHAR') {
      download(url, 'video.mp4');
    } else {
      res.sendFile(path.join(__dirname, '..', 'public', 'url-error.html'));
    }
    console.log(err.message);
    console.log(err.code);
  });
});

module.exports = router;