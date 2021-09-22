export const SOUND_PATH = {
  BACKGROUND: './sound/THYKIER - Station 2 [NCS Release].mp3',
  KEYPRESS: './sound/dermotte_action-02.wav',
  KEYPRESS2: './sound/Beep Short.mp3',
  BLOCKDOWN: './sound/robo-kiss.wav',
  REMOVELINE: './sound/picked-coin-echo.wav'
}

export default class AudioManager {

  constructor() {
    this.initBackgroundSound();

  }

  initBackgroundSound() {
    this.backgroundSound = new Audio();
    this.backgroundSound.src = SOUND_PATH.BACKGROUND;
    this.backgroundSound.volume = 0.4;
    this.backgroundSound.loop = true;
  }

  playBackground() {
    this.backgroundSound.play();
  }

  pauseBackground() {
    this.backgroundSound.pause();
  }

  playKeyPressSound() {
    const keyPressSount = new Audio();
    keyPressSount.src = SOUND_PATH.KEYPRESS;
    keyPressSount.volume = 0.3;
    keyPressSount.play();
  }

  playBlockDownSound() {
    const blockDownSound = new Audio();
    blockDownSound.src = SOUND_PATH.BLOCKDOWN;
    blockDownSound.volume = 0.2;
    blockDownSound.play();
  }

  playRemoveLineSound() {
    const removeLineSound = new Audio();
    removeLineSound.src = SOUND_PATH.REMOVELINE;
    removeLineSound.play();
  }

  reset() {
    this.initBackgroundSound();
  }


}