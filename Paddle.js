class Paddle {
  constructor(x, w) {
    this.x = x;
    this.h = 100;
    this.w = w;
    this.y = height / 2 - this.h / 2;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
