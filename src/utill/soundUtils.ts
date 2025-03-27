export const clearApple = () => {
  const audio = new Audio('/sounds/clearApple.mp3');
  audio.loop = false;
  audio.volume = 0.5;
  audio.play();
};

export const selectRPS = () => {
  const audio = new Audio('/sounds/select.mp3');
  audio.loop = false;
  audio.volume = 0.5;
  audio.play();
};
