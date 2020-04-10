import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

export default function DownloadOptions(props) {
  const node = useRef();
  const spring = useSpring({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    from: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  });
  const innerSpring = useSpring({
    top: '50%',
    from: { top: '0%' },
  });

  useEffect(() => {
    const handleOuterClick = (e) => {
      if (node.current.contains(e.target)) return;
      props.closeDiv();
    };

    document.addEventListener('mousedown', handleOuterClick);
    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, [props]);

  return (
    <animated.div style={spring} className='DownloadOptions-wrapper'>
      <animated.div style={innerSpring} ref={node} className='DownloadOptions'>
        <button
          style={{ marginRight: '1rem', marginLeft: '1rem' }}
          className='animate-smooth'
          onClick={props.onVideo}
        >
          Video
        </button>
        <button
          style={{ marginRight: '1rem' }}
          className='animate-smooth'
          onClick={props.onAudio}
        >
          Audio
        </button>
      </animated.div>
    </animated.div>
  );
}
