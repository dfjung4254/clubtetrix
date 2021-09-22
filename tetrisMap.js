import { RECT_STYLE } from "./blockConst.js";
import OPTIONS from "./option.js";

export const MAP_STATE = {
  EMPTY: -1,
}

export default class TetrisMap {

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.blockCanvas = app.blockCanvas;
    this.map = Array.from(
      Array(OPTIONS.heightLength), 
      () => Array(OPTIONS.widthLength).fill(MAP_STATE.EMPTY)
    );
    this.additionalOffsetX = 0;
    this.additionalOffsetY = 0;
  }

  removeBlockLine(yIdx) {
    for(let x = 0; x < this.map[yIdx].length; x++) {
      this.map[yIdx][x] = MAP_STATE.EMPTY;
    }
    for(let y = yIdx; y > 0; y--) {
      const tmpLine = this.map[y - 1];
      this.map[y - 1] = this.map[y];
      this.map[y] = tmpLine;
    }
    this.app.audioManager.playRemoveLineSound();
  }

  checkBlockLine() {
    let removeCount = 0;
    for(let y = 0; y < this.map.length; y++) {
      let isEmptyIn = this.map[y].some(type => type === MAP_STATE.EMPTY);
      if(!isEmptyIn) {
        this.removeBlockLine(y);
        y--;
        removeCount++;
      }
    }
    return removeCount;
  }

  addBlockToMap(block) {
    const type = block.getType();
    const positions = block.getPositions();
    positions.forEach((pos) => {
      try{
        this.map[pos.y][pos.x] = type;
      }catch(e) {

      }
    });
    return this.checkBlockLine();
  }

  getPos(x, y) {
    return this.map[y][x];
  }

  isEmptyPos(x, y) {
    return this.map[y][x] === MAP_STATE.EMPTY;
  }

  isAvailablePos(x, y) {
    // 범위 안
    if(x < OPTIONS.widthLength && x >= 0 && y < OPTIONS.heightLength) {
      if(y >= 0) {
        return this.isEmptyPos(x, y);
      }
      return true;
    }
    return false;
  }

  isIlligalPosition(block) {
    const positions = block.getPositions();
    for(let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      try{
        if(this.map[pos.y][pos.x] !== MAP_STATE.EMPTY) {
          return true;
        }
      }catch(e) {

      }
    }
    return false;
  }

  shakeMap() {
    if(this.shake) {
      if(!this.shakeCount) {
        this.shakeCount = 1;
      }
      
      this.additionalOffsetY = Math.sign(this.shakeCount) * 6;

      this.shakeCount += 5;
      if(this.shakeCount >= 20) {
        this.shakeCount = 0;
        this.shake = false;
        this.additionalOffsetY = 0;
        this.additionalOffsetX = 0;
      }
    }
  }

  toggleShake() {
    this.shake = true;
  }

  update() {
    this.shakeMap();
  }

  draw() {

    this.drawBackground();
    this.drawBlock();

  }

  drawBackground() {
    const x = OPTIONS.mapX + this.additionalOffsetX;
    const y = OPTIONS.mapY + this.additionalOffsetY;
    const height = this.map.length * OPTIONS.baseBlockWidth;
    const width = this.map[0].length * OPTIONS.baseBlockWidth;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 5;
    // left
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + height);
    this.ctx.stroke();

    // right
    this.ctx.beginPath();
    this.ctx.moveTo(x + width, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.stroke();

    // bottom
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + height);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.stroke();

    // grid - vertical
    for(let i = 1; i < this.map[0].length; i++) {
      this.ctx.strokeStyle = '#FFFFFF99';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x + OPTIONS.baseBlockWidth * i, y );
      this.ctx.lineTo(x + OPTIONS.baseBlockWidth * i, y + height);
      this.ctx.stroke();
    }

    // grid - horizontal
    for(let i = 1; i < this.map.length; i++) {
      this.ctx.strokeStyle = '#FFFFFF99';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + OPTIONS.baseBlockWidth * i);
      this.ctx.lineTo(x + width, y + OPTIONS.baseBlockWidth * i);
      this.ctx.stroke();
    }

  }

  drawBlock() {

    for(let y = 0; y < this.map.length; y++) {
      for(let x = 0; x < this.map[y].length; x++) {        
        if(this.map[y][x] !== MAP_STATE.EMPTY) {
          const type = this.map[y][x];          
          this.ctx.drawImage(
            this.blockCanvas.getCanvas(type),
            x * OPTIONS.baseBlockWidth + OPTIONS.mapX + this.additionalOffsetX,
            y * OPTIONS.baseBlockWidth + OPTIONS.mapY + this.additionalOffsetY
          );

        }
      }
    }

  }

  reset() {
    this.map = Array.from(
      Array(OPTIONS.heightLength), 
      () => Array(OPTIONS.widthLength).fill(MAP_STATE.EMPTY)
    );
    this.additionalOffsetX = 0;
    this.additionalOffsetY = 0;
  }

}