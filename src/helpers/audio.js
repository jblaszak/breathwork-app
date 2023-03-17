export function fadeOutAudio(audio) {
  let volume = 1;
  const intervalId = setInterval(() => {
    volume = volume * 0.8;
    audio.volume = volume;
    if (volume < 0.02) {
      audio.volume = 0;
      audio.currentTime = 0;
      audio.pause();
      clearInterval(intervalId);
    }
  }, 100);
}

export function fadeInAudio(audio) {
  let volume = 0.01;
  const intervalId = setInterval(() => {
    volume = volume * 1.2;
    audio.volume = volume > 1 ? 1 : volume;
    if (volume >= 1) {
      clearInterval(intervalId);
    }
  }, 100);
}
