import React from 'react';

import styles from '../styles.module.css';

export default function Title() {
  return (
    <div className={styles.title}>
      <h1>OffTube</h1>
      <h2>
        Warning: This project was created for educational purposes and it is
        against the YouTube Terms of Service to download YouTube videos and
        copyrighted videos.
      </h2>
    </div>
  );
}
