import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import axios from 'axios';
import '../styles.module.css';
import Title from '../components/Title';
import VideoUrl from '../components/VideoUrl';
import DownloadOptions from '../components/DownloadOptions';

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
            setDownloadOptions(false);
            axios({
              url: `${server}/download/video?url=${url}`,
              method: 'GET',
              responseType: 'blob'
            })
              .then(res => fileDownload(res.data, 'video.mp4'))
              .catch(err => console.log(err));
          }}
          onAudio={() => {
            setDownloadOptions(false);
          }}
        />
      )}
    </div>
  );
}
