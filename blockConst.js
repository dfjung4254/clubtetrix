import { roundRect2 } from "./drawUtils.js";
import OPTIONS from "./option.js";

export class BlockImageCanvas {

  constructor(app) {
    this.app = app;
    this.blockCanvas = [];
    this.blockEffectCanvas = [];
    this.makeRectCanvas(this.blockCanvas);
    this.makeRectCanvas(this.blockEffectCanvas, RECT_EFFECT_STYLE);
  }

  getCanvas(type) {
    return this.blockCanvas[type];
  }

  getEffectCanvas(type) {
      return this.blockEffectCanvas[type];
  }

  makeRectCanvas(canvasArray, style = RECT_STYLE) {

    const typeLength = Object.keys(RECT).length;
    const padding = 6;
    const baseX = padding / 2;
    const baseY = padding / 2;
    const baseWidth = OPTIONS.baseBlockWidth - padding;
    for(let type = 0; type < typeLength; type++) {

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      for(const key in style[type]) {
        context[key] = style[type][key];
      }

      roundRect2(
        context,
        baseX,
        baseY,
        baseWidth,
        baseWidth,
        3
      );

      canvasArray.push(canvas);
    }

  }

}

export const RECT = {
    I: 0,
    O: 1,
    T: 2,
    L: 3,
    J: 4,
    S: 5,
    Z: 6
};

export const RECT_TYPE = [
    [   // I
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 2}],   // up
        [{x: 0, y: 1},{x: 1, y: 1}, {x: -1, y: 1}, {x: -2, y : 1}],  // right
        [{x: -1, y: 1}, {x: -1, y: 2}, {x: -1, y: 0}, {x: -1, y: -1}],   // down
        [{x: -1, y: 0},{x: -2, y: 0},{x: 0, y: 0},{x: 1, y : 0}]     // left 
    ],  
    [   // O
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
    ],
    [   // T
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0}],
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}],
    ],
    [   // L
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 1}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
        [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}],
    ],
    [   // J
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 1}],
        [{x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}],
        [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: -1, y: 2}],
        [{x: 0, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}],
    ],
    [   // S
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: -1, y: -1}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: -1, y: -1}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}],
    ],
    [   // Z
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}],
        [{x: -2, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
        [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}],
        [{x: -2, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}],
    ]
    
];

export const RECT_STYLE = [
    {   // I
        fillStyle: 'rgb(239, 222, 255)',
        strokeStyle: 'rgb(239, 222, 255)',
        shadowColor: 'rgb(239, 222, 255)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // O
        fillStyle: 'rgb(222, 255, 255)',
        strokeStyle: 'rgb(222, 255, 255)',
        shadowColor: 'rgb(222, 255, 255)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // T
        fillStyle: 'rgb(255, 255, 222)',
        strokeStyle: 'rgb(255, 255, 222)',
        shadowColor: 'rgb(255, 255, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // L
        fillStyle: 'rgb(222, 239, 239)',
        strokeStyle: 'rgb(222, 239, 239)',
        shadowColor: 'rgb(222, 239, 239)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // J
        fillStyle: 'rgb(222, 255, 239)',
        strokeStyle: 'rgb(222, 255, 239)',
        shadowColor: 'rgb(222, 255, 239)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // S
        fillStyle: 'rgb(255, 222, 222)',
        strokeStyle: 'rgb(255, 222, 222)',
        shadowColor: 'rgb(255, 222, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    {   // Z
        fillStyle: 'rgb(239, 239, 222)',
        strokeStyle: 'rgb(239, 239, 222)',
        shadowColor: 'rgb(239, 239, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 3
    },
    
];

export const RECT_EFFECT_STYLE = [
  {   // I
    fillStyle: 'rgb(239, 222, 255)',
    strokeStyle: 'rgb(239, 222, 255)',
    shadowColor: 'rgb(239, 222, 255)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // O
    fillStyle: 'rgb(222, 255, 255)',
    strokeStyle: 'rgb(222, 255, 255)',
    shadowColor: 'rgb(222, 255, 255)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // T
    fillStyle: 'rgb(255, 255, 222)',
    strokeStyle: 'rgb(255, 255, 222)',
    shadowColor: 'rgb(255, 255, 222)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // L
    fillStyle: 'rgb(222, 239, 239)',
    strokeStyle: 'rgb(222, 239, 239)',
    shadowColor: 'rgb(222, 239, 239)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // J
    fillStyle: 'rgb(222, 255, 239)',
    strokeStyle: 'rgb(222, 255, 239)',
    shadowColor: 'rgb(222, 255, 239)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // S
    fillStyle: 'rgb(255, 222, 222)',
    strokeStyle: 'rgb(255, 222, 222)',
    shadowColor: 'rgb(255, 222, 222)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },
  {   // Z
    fillStyle: 'rgb(239, 239, 222)',
    strokeStyle: 'rgb(239, 239, 222)',
    shadowColor: 'rgb(239, 239, 222)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 10,
    lineWidth: 10
  },

];



