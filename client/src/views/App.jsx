import React, { useState } from 'react';
import Axios from 'axios';

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
        <DownloadOptions closeDiv={() => setDownloadOptions(false)} />
      )}
    </div>
  );
}
