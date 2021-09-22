import { Block, ROTATE } from "./block.js";
import { RECT, RECT_TYPE } from "./blockConst.js";
import OPTIONS from "./option.js";

export default class BlockManager {

  constructor(app, size) {
    this.app = app;
    this.queue = new Array();
    this.ctx = app.context;
    this.map = app.map;
    this.size = size;
    this.typeCount = Object.keys(RECT).length;
    this.blockCanvas = app.blockCanvas;

    this.initQueue();
  }

  initQueue() {
    for(let i = 0; i < this.size; i++) {
      this.pushNewBlock();
    }
  }

  getNextBlock() {
    const nextBlock = this.queue.shift();
    this.pushNewBlock();
    return nextBlock;
  }

  pushNewBlock() {
    const thisBlockType = this.getRandomInt(0, this.typeCount);
    this.queue.push(new Block(this.ctx, OPTIONS.widthLength / 2, 0, thisBlockType, this.map, this.blockCanvas, this.app.audioManager));
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  update() {

  }

  draw() {
    const x = OPTIONS.mapX + OPTIONS.baseBlockWidth * (OPTIONS.widthLength + 3);
    let y = 0;

    this.queue.forEach((block, index) => {
      y = index * OPTIONS.baseBlockWidth * 5 + OPTIONS.mapY + OPTIONS.baseBlockWidth * 2;
      for(let i = 0; i < 4; i++) {
        this.ctx.drawImage(
          this.blockCanvas.getCanvas(block.type),
          x + (RECT_TYPE[block.type][ROTATE.UP][i].x * OPTIONS.baseBlockWidth),
          y + (RECT_TYPE[block.type][ROTATE.UP][i].y * OPTIONS.baseBlockWidth)
        );
      }

    });

  }
  
  reset() {
    this.queue = new Array();
    this.initQueue();
  }

}