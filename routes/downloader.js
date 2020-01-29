const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

const router = express.Router();

// Routes

router.get('/', (req, res) => {
  const url = req.query.url
  console.log(url);

  ytdl.getBasicInfo(url).then(
    (info) => {
      console.log(`Title: ${info.title}`);
      console.log(`Author: ${info.author.name}`);
      return info;
    }
  ).then((info) => {
    res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
    ytdl(
      url,
      {
        quality: 'highest',
        format: 'mp4'
      }
    ).pipe(res);
  }).catch((err) => {
    if (err.code === 'ERR_INVALID_CHAR') {
      res.header('Content-Disposition', `attachment; filename="video.mp4"`);
      ytdl(
        url,
        {
          quality: 'highest',
          format: 'mp4'
        }
      ).pipe(res);
    } else {
      res.sendFile(path.join(__dirname, '..', 'public', 'url-error.html'));
    }
    console.log(err.message);
    console.log(err.code);
  });
});

module.exports = router;