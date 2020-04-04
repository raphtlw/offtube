import express from 'express';
import cors from 'cors';
import fs from 'fs';
import youtubedl from 'youtube-dl';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the OffTube API server');
});

app.get('/download/video', (req, res) => {
  const { url } = req.query;
  console.log(`URL: ${url}`);
  const video = youtubedl(url, [], {});

  let videoFilename = '';

  video.on('info', info => {
    console.log('Download started');
    console.log(`Filename: ${info._filename}`);
    console.log(`Size: ${info.size}`);
    videoFilename = info._filename;
  });

  video.pipe(fs.createWriteStream(videoFilename));
  video.on('end', () => {
    res.download(videoFilename, err => fs.unlinkSync(videoFilename));
  });
});

app.get('/download/audio', (req, res) => {});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
