import { RECT_STYLE } from "./blockConst.js";
import OPTIONS from "./option.js";

export const MAP = {
  EMPTY: -1
}

export const MAP_STATE = {
  DEFAULT: {
    neon: false,
  },
  NEW_BLOCK: {
    neon: true,
    duration: 200,
    startTime: 0,
    opacity: 0,
    opacityDirection: 1
  }
}

export default class TetrisMap {

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.blockCanvas = app.blockCanvas;
    this.map = Array.from(
      Array(OPTIONS.heightLength), 
      () => Array(OPTIONS.widthLength).fill(MAP.EMPTY)
    );
    this.mapState = Array.from(
        Array(OPTIONS.heightLength),
        () => Array(OPTIONS.widthLength).fill(MAP_STATE.DEFAULT)
    );
    this.additionalOffsetX = 0;
    this.additionalOffsetY = 0;
  }

  removeBlockLine(yIdx) {
    for(let x = 0; x < this.map[yIdx].length; x++) {
      this.map[yIdx][x] = MAP.EMPTY;
      this.mapState[yIdx][x] = {};
    }
    for(let y = yIdx; y > 0; y--) {
      const tmpLine = this.map[y - 1];
      this.map[y - 1] = this.map[y];
      this.map[y] = tmpLine;
      const tmpLine2 = this.mapState[y - 1];
      this.mapState[y - 1] = this.mapState[y];
      this.mapState[y] = tmpLine2;
    }
    this.app.audioManager.playRemoveLineSound();
  }

  checkBlockLine() {
    let removeCount = 0;
    for(let y = 0; y < this.map.length; y++) {
      let isEmptyIn = this.map[y].some(type => type === MAP.EMPTY);
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
        this.mapState[pos.y][pos.x] = JSON.parse(JSON.stringify(MAP_STATE.NEW_BLOCK));
        this.mapState[pos.y][pos.x].startTime = Date.now();
      }catch(e) {

      }
    });
    return this.checkBlockLine();
  }

  getPos(x, y) {
    return this.map[y][x];
  }

  isEmptyPos(x, y) {
    return this.map[y][x] === MAP.EMPTY;
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
        if(this.map[pos.y][pos.x] !== MAP.EMPTY) {
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

  updateMapState(time) {
    for(let y = 0; y < this.mapState.length; y++) {
      for(let x = 0; x < this.mapState[y].length; x++) {
        if(this.mapState[y][x].neon) {
          if(this.mapState[y][x].startTime + this.mapState[y][x].duration <= time) {
            this.mapState[y][x].neon = false;
            console.log('false')
          }
          const opacityDuePower = 2 * (time - this.mapState[y][x].startTime) / this.mapState[y][x].duration;
          this.mapState[y][x].opacity = opacityDuePower >= 1 ? 2 - opacityDuePower : opacityDuePower;
        }
      }
    }


  }

  toggleShake() {
    this.shake = true;
  }

  update(time) {
    this.shakeMap();
    this.updateMapState(time);
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
    this.ctx.globalAlpha = 0.2;
    for(let i = 1; i < this.map[0].length; i++) {
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x + OPTIONS.baseBlockWidth * i, y );
      this.ctx.lineTo(x + OPTIONS.baseBlockWidth * i, y + height);
      this.ctx.stroke();
    }

    // grid - horizontal
    for(let i = 1; i < this.map.length; i++) {
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + OPTIONS.baseBlockWidth * i);
      this.ctx.lineTo(x + width, y + OPTIONS.baseBlockWidth * i);
      this.ctx.stroke();
    }
    this.ctx.globalAlpha = 1;

  }

  drawBlock() {

    for(let y = 0; y < this.map.length; y++) {
      for(let x = 0; x < this.map[y].length; x++) {        
        if(this.map[y][x] !== MAP.EMPTY) {
          const type = this.map[y][x];
          this.ctx.drawImage(
            this.blockCanvas.getCanvas(type),
            x * OPTIONS.baseBlockWidth + OPTIONS.mapX + this.additionalOffsetX,
            y * OPTIONS.baseBlockWidth + OPTIONS.mapY + this.additionalOffsetY
          );
        }

        if(this.mapState[y][x].neon) {
          this.ctx.globalAlpha = this.mapState[y][x].opacity;
          const type = this.map[y][x];
          this.ctx.drawImage(
            this.blockCanvas.getEffectCanvas(type),
            x * OPTIONS.baseBlockWidth + OPTIONS.mapX + this.additionalOffsetX,
            y * OPTIONS.baseBlockWidth + OPTIONS.mapY + this.additionalOffsetY
          );
          this.ctx.globalAlpha = 1;
        }

      }
    }

  }

  reset() {
    this.map = Array.from(
      Array(OPTIONS.heightLength), 
      () => Array(OPTIONS.widthLength).fill(MAP.EMPTY)
    );
    this.additionalOffsetX = 0;
    this.additionalOffsetY = 0;
  }

}