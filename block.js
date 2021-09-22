import { RECT_TYPE, RECT_STYLE } from "./blockConst.js";
import OPTIONS from "./option.js";
import { roundRect2 } from "./drawUtils.js";

export const ROTATE = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

export class Block {

  constructor(context, x, y, type, map, blockCanvas, audioManager) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.type = type;
    this.rotateState = ROTATE.UP;
    this.map = map;
    this.blockCanvas = blockCanvas;
    this.audioManager = audioManager;
    this.checkOffsetX = [0, 1, 2, -1, -2, 0, 0];
    this.checkOffsetY = [0, 0, 0, 0, 0, -1, -2];
    this.blockDownCount = 0;
  }

  getRealX() {
    return this.x * OPTIONS.baseBlockWidth + OPTIONS.mapX;
  }

  getRealY() {
    return this.y * OPTIONS.baseBlockWidth + OPTIONS.mapY;
  }

  getType() {
    return this.type;
  }

  getPositions() {
    const positions = new Array();
    for(let i = 0; i < 4; i++) {
      positions.push({
        x: this.x + RECT_TYPE[this.type][this.rotateState][i].x,
        y: this.y + RECT_TYPE[this.type][this.rotateState][i].y
      });
    }
    return positions;
  }

  getBlockDownCount() {
    return this.blockDownCount;
  }

  update() {

  }

  draw() {    

    for(let i = 0; i < 4; i++) {      
      if(this.y + RECT_TYPE[this.type][this.rotateState][i].y < 0) {
        continue;
      }
      this.ctx.drawImage(
        this.blockCanvas.getCanvas(this.type),
        (this.x + RECT_TYPE[this.type][this.rotateState][i].x) * OPTIONS.baseBlockWidth + OPTIONS.mapX,
        (this.y + RECT_TYPE[this.type][this.rotateState][i].y) * OPTIONS.baseBlockWidth + OPTIONS.mapY
      );
    }

  }

  peekNextRotateState() {
    return (this.rotateState + 1) % 4;
  }

  setNextRotateState() {
    this.rotateState = this.peekNextRotateState();
  }

  changeRotateState(noSound = false) {

    for(let i = 0; i < this.checkOffsetX.length; i++) {
      if(!this.collisionCheck(this.x + this.checkOffsetX[i], this.y + this.checkOffsetY[i], this.peekNextRotateState())) {
        this.x += this.checkOffsetX[i];
        this.y += this.checkOffsetY[i];
        this.setNextRotateState();
        if(!noSound) {
          this.audioManager.playKeyPressSound();
        }
        return true;
      }
    }
    return false;

  }

  moveRight(noSound = false) {
    if(this.collisionCheck(this.x + 1, this.y, this.rotateState)) {
      return false;
    }    
    if(!noSound) {
      this.audioManager.playKeyPressSound();
    }
    this.x += 1;
    return true;
  }

  moveLeft(noSound = false) {
    if(this.collisionCheck(this.x - 1, this.y, this.rotateState)) {
      return false;
    }
    if(!noSound) {
      this.audioManager.playKeyPressSound();
    }
    this.x -= 1;
    return true;
  }

  moveDown(noSound = false) {
    if(this.collisionCheck(this.x, this.y + 1, this.rotateState)) {
      this.blockDownCount++;
      return false;
    }
    if(!noSound) {
      this.audioManager.playKeyPressSound();
    }
    this.blockDownCount = 0;
    this.y += 1;
    return true;
  }

  moveDownEnd(noSound = false) {
    let targetY = this.y;
    while(!this.collisionCheck(this.x, targetY, this.rotateState)) {
      targetY++;
    }
    if(!noSound) {
      this.audioManager.playBlockDownSound();
    }
    this.y = --targetY;
  }

  collisionCheck(toX, toY, toRotateState) {
    for(let i = 0; i < 4; i++) {
      const x = toX + RECT_TYPE[this.type][toRotateState][i].x;
      const y = toY + RECT_TYPE[this.type][toRotateState][i].y;
      if(!this.map.isAvailablePos(x, y)) {
        // collision occured
        return true;
      }
    }
    return false;
  }

}