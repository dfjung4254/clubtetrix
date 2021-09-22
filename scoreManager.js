import OPTIONS from './option.js';

export class ScoreManager {

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.score = 0;
    this.comboCount = 0;
    this.maxComboCount = 0;
    this.lineCount = 0;
  }

  addScore(line) {

    if (line === 0) {
      this.comboCount = 0;
      this.score += 10;
    } else {
      this.lineCount += line;
      this.comboCount += line;
      this.score += line * 100 * (this.comboCount);
      this.maxComboCount = Math.max(this.maxComboCount, this.comboCount);
    }
  }

  getScore() {
    return this.score;
  }

  getMaxComboCount() {
    return this.maxComboCount;
  }

  getLineCount() {
    return this.lineCount;
  }

  update() {

  }

  draw() {
    // combo
    this.ctx.font = '24px Helvetica Neue';
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'COMBO',
      OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength - 8) * OPTIONS.baseBlockWidth
    );

    this.ctx.font = '40px Helvetica Neue';
    this.ctx.fillStyle = 'rgb(255, 242, 249)';
    this.ctx.fillText(
      this.comboCount,
      OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength - 7) * OPTIONS.baseBlockWidth
    );

    // score
    this.ctx.font = '24px Helvetica Neue';
    this.ctx.fillStyle = 'rgb(255, 242, 249)';
    this.ctx.fillText(
      'SCORE',
      OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength - 5) * OPTIONS.baseBlockWidth
    );

    this.ctx.font = '40px Helvetica Neue';
    this.ctx.fillStyle = 'rgb(255, 242, 249)';
    this.ctx.fillText(
      this.score,
      OPTIONS.mapX + (OPTIONS.widthLength + 3) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength - 4) * OPTIONS.baseBlockWidth
    );
  }

  reset() {
    this.score = 0;
    this.comboCount = 0;
    this.maxComboCount = 0;
    this.lineCount = 0;
  }

}