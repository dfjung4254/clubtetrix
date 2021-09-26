import { Block, ROTATE } from "./block.js";
import { RECT, RECT_TYPE } from "./blockConst.js";
import OPTIONS from "./option.js";

export default class BlockManager {

  constructor(app, size) {
    this.app = app;
    this.ctx = app.context;
    this.map = app.map;
    this.size = size;
    this.typeCount = Object.keys(RECT).length;
    this.blockCanvas = app.blockCanvas;
    this.initQueue();
  }

  initQueue() {
    this.queue = new Array();
    this.generatedBlockSet = new Array();
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
    const thisBlockType = this.getRandomNextBlock();
    this.queue.push(new Block(this.ctx, OPTIONS.widthLength / 2, -2, thisBlockType, this.map, this.blockCanvas, this.app.audioManager, this.app));
  }

  getRandomNextBlock() {
    if(this.generatedBlockSet.length === 0) {
      this.generatedBlockSet = [];
      for (let rectKey in RECT) {
        this.generatedBlockSet.push(RECT[rectKey]);
      }
      this.shuffleBlockSet(this.generatedBlockSet);
    }
    return this.generatedBlockSet.shift();
  }

  shuffleBlockSet(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
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
    this.initQueue();
  }

}