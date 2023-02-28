import React, { useRef } from 'react';
import okSound from '../assets/audio/ok.mp3'
import nokSound from '../assets/audio/nok.mp3'

const NotificationSound = () => {
  const audioRef = useRef(null);

  return (
    <audio ref={audioRef} />
  );
};

export const playNotification = (type) => {
  const audioElement = document.createElement('audio');
  type === 'ok' && audioElement.setAttribute('src', okSound);
  type === 'nok' && audioElement.setAttribute('src', nokSound);
  audioElement.setAttribute('type', "audio/mpeg");
  audioElement.play();
};

export default NotificationSound;