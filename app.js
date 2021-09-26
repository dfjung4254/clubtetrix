import TetrisMap from "./tetrisMap.js";
import { BlockImageCanvas } from "./blockConst.js";
import BlockManager from "./blockManager.js";
import AudioManager from "./audioManager.js";
import { GameManager, DIRECTION } from "./gameManager.js";
import { ScoreManager } from "./scoreManager.js";
import { ResultManager } from "./resultManager.js";
import { LevelManager } from "./levelManager.js";
import { EffectManager } from "./effectManager.js";

export default class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    this.init();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  init() {
    this.initCanvasObjects();
    this.initMap();
    this.initAudio();
    this.initBlock();
    this.initKeyHandlers();
    this.initScoreManager();
    this.initResultManager();
    this.initLevelManager();
    this.initEffectManager();
    this.initGameManager();
  }

  reset() {
    this.map.reset();
    this.audioManager.reset();
    this.blockManager.reset();
    this.scoreManager.reset();
    this.levelManager.reset();
    this.effectManager.reset();
    this.gameManager.reset();
  }
 
  initAudio() {
    this.audioManager = new AudioManager();
  }

  initCanvasObjects() {
    this.blockCanvas = new BlockImageCanvas(this);
  }

  initMap() {
    this.map = new TetrisMap(this);
  }

  initBlock() {
    this.blockManager = new BlockManager(this, 2);
  }

  initScoreManager() {
    this.scoreManager = new ScoreManager(this);
  }

  initResultManager() {
    this.resultManager = new ResultManager(this);
  }

  initLevelManager() {
    this.levelManager = new LevelManager(this);
  }

  initEffectManager() {
    this.effectManager = new EffectManager(this);
  }

  initGameManager() {
    this.gameManager = new GameManager(this);
  }

  initKeyHandlers() {
    document.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'Enter':
          this.gameManager.handleGameState();          
          break;
        case 'ArrowUp':
          this.gameManager.changeBlockRotateState();
          break;
        case 'ArrowRight':
          this.gameManager.moveBlock(DIRECTION.RIGHT);
          break;
        case 'ArrowDown':
          this.gameManager.moveBlock(DIRECTION.DOWN);
          break;
        case 'ArrowLeft':
          this.gameManager.moveBlock(DIRECTION.LEFT);
          break;
        case 'Space':
          this.gameManager.handleSpace();
          break;
      }

    }, false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.context.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.gameManager.update(Date.now());
    this.gameManager.draw();
  }
    
}

window.onload = () => {
  new App();
}