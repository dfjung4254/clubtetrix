import OPTIONS from './option.js';

export const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

export const GAME_STATE = {
  WAITING: 0,
  PLAYING: 1,
  RESULTING: 2
}

export class GameManager {

  constructor(app) {
    this.app = app;
    this.audioManager = app.audioManager;
    this.map = app.map;
    this.blockManager = app.blockManager;
    this.scoreManager = app.scoreManager;
    this.resultManager = app.resultManager;
    this.levelManager = app.levelManager;
    this.effectManager = app.effectManager;
    this.gameState = GAME_STATE.WAITING;
    this.reset();
  }

  isGamePlaying() {
    return this.interval !== null;
  }

  // Enter
  handleGameState() {

    switch(this.gameState) {
      case GAME_STATE.WAITING:
        this.togglePlaying();
        this.gameState = GAME_STATE.PLAYING;
        break;
      case GAME_STATE.PLAYING:
        this.togglePlaying();
        break;
      case GAME_STATE.RESULTING:
        this.app.reset();
        this.gameState = GAME_STATE.WAITING;
        break;
    }

  }

  togglePlaying() {
    if(!this.isGamePlaying()) {
      // start
      this.playGame();
    }else {
      // pause
      this.pauseGame();
    }
  }

  playGame() {
    this.audioManager.playBackground();
    this.setPlayingInterval();
  }

  pauseGame() {
    this.audioManager.pauseBackground();
    clearInterval(this.interval);
    this.interval = null;
  }

  stopGame() {
    this.pauseGame();
    this.gameState = GAME_STATE.RESULTING;
    this.resultManager.setResultScore(this.scoreManager.getScore(), this.scoreManager.getMaxComboCount());
  }

  setPlayingInterval() {
    this.interval = setInterval(() => {
        
      if(!this.block.moveDown(true) && 
      this.block.getBlockDownCount() >= this.levelManager.getBlockDownCountByLevel()) {
        this.changeCurrentBlock();
      }

    }, this.levelManager.getTimeInterval());

  }

  changeSpeed() {
    clearInterval(this.interval);
    this.setPlayingInterval();
  }

  changeCurrentBlock() {

    if(this.checkGameEnd()) {
      this.stopGame();
      return;
    }

    const removeLine = this.map.addBlockToMap(this.block);
    this.scoreManager.addScore(removeLine);    

    const nextBlock = this.blockManager.getNextBlock();
    if(this.map.isIlligalPosition(nextBlock)) {
      this.stopGame();
      return;
    }

    const isLevelChanged = this.levelManager.isLevelChanged(this.scoreManager.getLineCount());
    if(isLevelChanged) {
      this.changeSpeed();
    }

    this.block = nextBlock;
  }

  checkGameEnd() {
    const positions = this.block.getPositions();
    let outCount = 0;
    positions.forEach(pos => {
      if(pos.x >= 0 && pos.x < OPTIONS.widthLength && pos.y < 0) {
        outCount++;
      }
    })
    return outCount >= 2;
  }

  changeBlockRotateState() {
    if(!this.isGamePlaying()) return;
    this.block.changeRotateState();
  }

  moveBlock(direction) {
    if(!this.isGamePlaying()) return;
    switch(direction) {
      case DIRECTION.RIGHT:
        this.block.moveRight();
        break;
      case DIRECTION.LEFT:
        this.block.moveLeft();
        break;
      case DIRECTION.DOWN:
        this.block.moveDown();
        break;
    }
  }

  handleSpace() {
    // 게임 진행 중 스페이스 입력 시
    if(this.isGamePlaying()) {
      this.block.moveDownEnd();
      this.map.toggleShake();
      this.effectManager.addEffect(
        this.block.getRealX(),
        this.block.getRealY()
      );
      this.changeCurrentBlock();
    }

  }

  update() {
    this.map.update();
    if(this.isGamePlaying()) {
      this.block.update();
    }
    this.effectManager.update();
    this.blockManager.update();
    this.scoreManager.update();
    this.levelManager.update();
    if(this.gameState === GAME_STATE.RESULTING) {
      this.resultManager.update();
    }

  }

  draw() {
    this.map.draw();
    if(this.isGamePlaying()) {
      this.block.draw();
    }
    this.effectManager.draw();
    this.blockManager.draw();
    this.scoreManager.draw();
    this.levelManager.draw();
    if(this.gameState === GAME_STATE.RESULTING) {
      this.resultManager.draw();
    }

  }

  reset() {
    this.interval = null;
    this.block = this.blockManager.getNextBlock();
  }

}