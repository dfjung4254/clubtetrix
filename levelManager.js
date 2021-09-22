import OPTIONS from './option.js';

export class LevelManager {

  TIME_BY_LEVEL = [
    0, 1000, 950, 900, 850, 800, 750, 700, 650, 600,
    550, 500, 450, 400, 350, 300, 250, 200, 150, 100
  ]

  BLOCK_DOWN_COUNT = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 2, 2
  ]

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.level = 1;
    this.speed = 600;
  }

  getTimeInterval() {
    return this.TIME_BY_LEVEL[Math.min(this.level, this.TIME_BY_LEVEL.length - 1)];
  }

  getBlockDownCountByLevel() {
    return this.BLOCK_DOWN_COUNT[Math.min(this.level, this.BLOCK_DOWN_COUNT.length - 1)];
  }

  isLevelChanged(lineCount) {
    const beforeLevel = this.level;
    this.level = parseInt(lineCount / 10) + 1;
    if(beforeLevel !== this.level) {
      return true;
    }
    return false;
  }

  getLevel() {
    return this.level;
  }

  update() {

  }

  draw() {
        // level
        this.ctx.font = '24px Helvetica Neue';
        this.ctx.fillStyle = 'rgb(255, 242, 249)';
        this.ctx.fillText(
          'LEVEL',
          OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
          OPTIONS.mapY + (OPTIONS.heightLength - 2) * OPTIONS.baseBlockWidth
        );
    
        this.ctx.font = '40px Helvetica Neue';
        this.ctx.fillStyle = 'rgb(255, 242, 249)';
        this.ctx.fillText(
          this.level,
          OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
          OPTIONS.mapY + (OPTIONS.heightLength - 1) * OPTIONS.baseBlockWidth
        );
  }

  reset() {
    this.level = 1;
    this.speed = 1000;
  }

}