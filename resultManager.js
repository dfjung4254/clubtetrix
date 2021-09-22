import OPTIONS from './option.js';

export class ResultManager {

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.score = 0;
    this.maxComboCount = 0;    
  }

  setResultScore(score, maxComboCount) {
    this.score = score;
    this.maxComboCount = maxComboCount;
  }

  update() {

  }

  draw() {

    const offsetX = 2;
    const offsetY = 3;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(
      OPTIONS.mapX - (OPTIONS.baseBlockWidth * offsetX),
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY) * OPTIONS.baseBlockWidth,
      (OPTIONS.widthLength + offsetX * 2) * OPTIONS.baseBlockWidth,
      offsetY * OPTIONS.baseBlockWidth * 2
    );
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(
      OPTIONS.mapX - (OPTIONS.baseBlockWidth * offsetX),
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY) * OPTIONS.baseBlockWidth
    );
    this.ctx.lineTo(
      OPTIONS.mapX - (OPTIONS.baseBlockWidth * offsetX) + (OPTIONS.widthLength + offsetX * 2) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY) * OPTIONS.baseBlockWidth
    );
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(
      OPTIONS.mapX - (OPTIONS.baseBlockWidth * offsetX),
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY) * OPTIONS.baseBlockWidth + offsetY * OPTIONS.baseBlockWidth * 2
    );
    this.ctx.lineTo(
      OPTIONS.mapX - (OPTIONS.baseBlockWidth * offsetX) + (OPTIONS.widthLength + offsetX * 2) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY) * OPTIONS.baseBlockWidth + offsetY * OPTIONS.baseBlockWidth * 2
    );
    this.ctx.stroke();

    this.ctx.font = '40px Helvetica Neue';
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'MAX COMBO : ' + this.maxComboCount,
      OPTIONS.mapX + (OPTIONS.widthLength / 2) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength / 2 - offsetY + 2) * OPTIONS.baseBlockWidth
    );
    this.ctx.font = '120px Helvetica Neue';
    this.ctx.fillText(
      this.score,
      OPTIONS.mapX + (OPTIONS.widthLength / 2) * OPTIONS.baseBlockWidth,
      OPTIONS.mapY + (OPTIONS.heightLength / 2 + offsetY - 1) * OPTIONS.baseBlockWidth
    );

  }


}