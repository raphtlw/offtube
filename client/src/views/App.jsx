import React, { useState, useEffect } from 'react';

import '../style.css';
import Title from '../components/Title';
import VideoUrl from '../components/VideoUrl';
import DownloadOptions from '../components/DownloadOptions';

const server = 'https://offtube-backend.herokuapp.com';

export default function App() {
  const [url, setUrl] = useState('');
  const [originalDocumentTitle, setOriginalDocumentTitle] = useState('');
  const [downloadButton, setDownloadButton] = useState('Download');
  const [downloadOptions, setDownloadOptions] = useState(false);

  useEffect(() => {
    setOriginalDocumentTitle(document.title);
  }, []);

  const downloading = () => {
    setDownloadButton('Downloading...');
    document.title = 'Downloading...';
    setTimeout(() => {
      document.title = originalDocumentTitle;
      setDownloadButton('Download');
    }, 3000);
  };

  return (
    <div>
      <Title />
      <VideoUrl
        onSubmit={(url) => {
          setUrl(url);
          if (url.includes('youtube.com/')) {
            setDownloadOptions(true);
          } else {
            setDownloadButton('Invalid URL');
            setTimeout(() => setDownloadButton('Download'), 1000);
          }
        }}
        buttonText={downloadButton}
      />
      {downloadOptions && (
        <DownloadOptions
          closeDiv={() => setDownloadOptions(false)}
          onVideo={() => {
            setDownloadOptions(false);
            downloading();
            window.open(`${server}/download/video?url=${url}`);
          }}
          onAudio={() => {
            setDownloadOptions(false);
            downloading();
            window.open(`${server}/download/audio?url=${url}`);
          }}
        />
      )}
    </div>
  );
}
