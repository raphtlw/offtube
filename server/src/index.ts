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
  youtubedl.exec(
    url,
    ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]'],
    {},
    (err, output) => {
      if (err) throw err;
      const filename = output[1].replace('[download] Destination: ', '');
      res.download(filename, (err) => fs.unlinkSync(filename));
    }
  );
});

app.get('/download/audio', (req, res) => {
  const { url } = req.query;
  console.log(`URL: ${url}`);
  youtubedl.exec(
    url,
    [
      '-x',
      '--audio-format',
      'mp3',
      '--ffmpeg-location',
      require('ffmpeg-static'),
    ],
    {},
    (err, output) => {
      if (err) console.error(err);
      console.log(output);
      const filename = output[3].replace('[ffmpeg] Destination: ', '');
      res.download(filename, (err) => fs.unlinkSync(filename));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
