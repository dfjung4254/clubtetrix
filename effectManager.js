const COLORS = [
  'rgb(239, 222, 255)',
  'rgb(222, 255, 255)',
  'rgb(255, 255, 222)',
  'rgb(222, 239, 239)',
  'rgb(222, 255, 239)',
  'rgb(255, 222, 222)',
  'rgb(239, 239, 222)',
];

export class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sx = x;
    this.sy = y;
    this.timer = null;
    this.setParticleDetail();
  }

  setParticleDetail() {
    const angle = this.getRandomInt(0, 360) * Math.PI / 180;
    const value = this.getRandomInt(90, 100);
    const radius = [-1, 1][this.getRandomInt(0, 2)] * value;
    this.tx = this.x + radius * Math.cos(angle);
    this.ty = this.y + radius * Math.sin(angle);
    this.radius = this.getRandomInt(2, 4);
    this.color = COLORS[this.getRandomInt(0, COLORS.length)];
    this.speed = this.getRandomInt(200, 600);
  }

  isPlaying() {
    return this.timer !== null;
  }

  play() {
    this.timer = Date.now();
    return this;
  }

  update(now) {
    if(this.timer) {
      if(now - this.timer <= this.speed) {
        this.x = this.sx + (this.tx - this.sx) * (now - this.timer) / this.speed;
        this.y = this.sy + (this.ty - this.sy) * (now - this.timer) / this.speed;
      }else {
        this.timer = null;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = this.color,
    ctx.fillRect(this.x, this.y, this.radius, this.radius);
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    // ctx.stroke();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}

export class EffectManager {

  constructor(app) {
    this.app = app;
    this.ctx = app.context;
    this.numberOfParticules = 20;
    this.animes = [];
  }

  addEffect(x, y) {
    for(let i = 0; i < this.numberOfParticules; i++) {
      this.animes.push(new Particle(x, y).play());
    }
  }

  update(){
    this.animes = this.animes.filter(anime => anime.isPlaying());
    const now = Date.now();
    this.animes.forEach(anime => anime.update(now));
  }

  draw() {
    this.animes.forEach(anime => anime.draw(this.ctx));
  }

}