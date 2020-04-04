import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import styles from '../styles.module.css';

export default function DownloadOptions(props) {
  const node = useRef();
  const spring = useSpring({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    from: { backgroundColor: 'rgba(0, 0, 0, 0)' }
  });
  const innerSpring = useSpring({
    top: '50%',
    from: { top: '0%' }
  });

  useEffect(() => {
    const handleOuterClick = e => {
      if (node.current.contains(e.target)) return;
      props.closeDiv();
    };

    document.addEventListener('mousedown', handleOuterClick);
    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, [props]);

  return (
    <animated.div style={spring} className={styles.downloadOptionsWrapper}>
      <animated.div
        style={innerSpring}
        ref={node}
        className={styles.downloadOptions}
      >
        <button
          style={{ marginRight: '1rem', marginLeft: '1rem' }}
          className={styles.animateSmooth}
          onClick={props.onVideo}
        >
          Video
        </button>
        <button
          style={{ marginRight: '1rem' }}
          className={styles.animateSmooth}
          onClick={props.onAudio}
        >
          Audio
        </button>
      </animated.div>
    </animated.div>
  );
}
