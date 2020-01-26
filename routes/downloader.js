const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

const router = express.Router();

// TODO: Download at best formats by default
// TODO: Convert from any format to mp4 if possible

// Routes

router.get('/', (req, res) => {
  const url = req.query.url
  console.log(url);  // For testing

  ytdl.getBasicInfo(url).then(
    (info) => {
      console.log(`Title: ${info.title}`);
      console.log(`Author: ${info.author.name}`);
      return info;
    }
  ).then((info) => {
    res.header('Content-Disposition', `attachment; filename="${info.title}"`);
    ytdl(
      url,
      { format: 'mp4' }
    ).pipe(res);
  });
});

module.exports = router;