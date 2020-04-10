import React, { useState } from 'react';

export default function VideoUrl(props) {
  const [url, changeUrl] = useState('');

  const submitUrl = () => {
    props.onSubmit(url);
    changeUrl('');
  };

  return (
    <div className='VideoUrl'>
      <div className='VideoUrl-background'>
        <input
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
      <button className='VideoUrl-submit animate-smooth' onClick={submitUrl}>
        {props.buttonText}
      </button>
    </div>
  );
}
