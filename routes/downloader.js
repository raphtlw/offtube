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
    res.sendFile(path.join(__dirname, '..', 'public', 'url-error.html'));
    console.log(err);
  });
});

module.exports = router;