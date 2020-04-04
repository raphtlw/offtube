import React, { useState } from 'react';
import '../styles.module.css';
import Title from '../components/Title';
import VideoUrl from '../components/VideoUrl';
import DownloadOptions from '../components/DownloadOptions';
const axios = require('axios');

const server = 'https://offtube-backend.herokuapp.com';

export default function App() {
  const [url, setUrl] = useState('');
  const [downloadOptions, setDownloadOptions] = useState(false);

  return (
    <div>
      <Title />
      <VideoUrl
        onSubmit={url => {
          setUrl(url);
          setDownloadOptions(true);
        }}
      />
      {downloadOptions && (
        <DownloadOptions
          closeDiv={() => setDownloadOptions(false)}
          onVideo={() => {
            console.log('Download started');
            axios({
              url: `${server}/download/video?url=${url}`,
              method: 'GET',
              responseType: 'blob'
            })
              .then(res => {
                window.open(res.data);
              })
              .catch(err => console.log(err));
          }}
          onAudio={() => {
            axios
              .get(`${server}/download/audio?url=${url}`)
              .then(res => window.open(res))
              .catch(err => console.log(err));
          }}
        />
      )}
    </div>
  );
}
