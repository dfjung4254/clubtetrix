import { roundRect2 } from "./drawUtils.js";
import OPTIONS from "./option.js";

export class BlockImageCanvas {

  constructor(app) {
    this.app = app;
    this.makeRectCanvas();
  }

  getCanvas(type) {
    return this.blockCanvas[type];
  }

  makeRectCanvas() {

    this.blockCanvas = new Array();
    const typeLength = Object.keys(RECT).length;
    const padding = 6;
    const baseX = padding / 2;
    const baseY = padding / 2;
    const baseWidth = OPTIONS.baseBlockWidth - padding;
    for(let type = 0; type < typeLength; type++) {

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      for(const key in RECT_STYLE[type]) {
        context[key] = RECT_STYLE[type][key];
      }

      roundRect2(
        context,
        baseX,
        baseY,
        baseWidth,
        baseWidth,
        3
      );

      this.blockCanvas.push(canvas);
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
        lineWidth: 4
    },
    {   // O
        fillStyle: 'rgb(222, 255, 255)',
        strokeStyle: 'rgb(222, 255, 255)',
        shadowColor: 'rgb(222, 255, 255)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    {   // T
        fillStyle: 'rgb(255, 255, 222)',
        strokeStyle: 'rgb(255, 255, 222)',
        shadowColor: 'rgb(255, 255, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    {   // L
        fillStyle: 'rgb(222, 239, 239)',
        strokeStyle: 'rgb(222, 239, 239)',
        shadowColor: 'rgb(222, 239, 239)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    {   // J
        fillStyle: 'rgb(222, 255, 239)',
        strokeStyle: 'rgb(222, 255, 239)',
        shadowColor: 'rgb(222, 255, 239)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    {   // S
        fillStyle: 'rgb(255, 222, 222)',
        strokeStyle: 'rgb(255, 222, 222)',
        shadowColor: 'rgb(255, 222, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    {   // Z
        fillStyle: 'rgb(239, 239, 222)',
        strokeStyle: 'rgb(239, 239, 222)',
        shadowColor: 'rgb(239, 239, 222)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        lineWidth: 4
    },
    
];



