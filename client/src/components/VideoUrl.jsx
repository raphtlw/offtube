import React, { useState } from 'react';
import multiClass from '../lib/multiClass';

import styles from '../styles.module.css';

export default function VideoUrl(props) {
  const [url, changeUrl] = useState('');

  const submitUrl = () => {
    props.onSubmit(url);
    changeUrl('');
  };

  return (
    <div className={styles.videoUrl}>
      <div className={styles.videoUrlBackground}>
        <input
          className={styles.videoUrlInput}
          type='text'
          value={url}
          onChange={(e) => changeUrl(e.target.value)}
          placeholder='Video link'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              submitUrl();
            }
          }}
        />
      </div>
      <button
        className={multiClass(styles.videoUrlSubmit, styles.animateSmooth)}
        onClick={submitUrl}
      >
        {props.buttonText}
      </button>
    </div>
  );
}
