class Ball {
  constructor() {
    this.x = width / 2;
    this.r = 10;
    this.y = random(this.r, height - this.r);
    if (random(1) > 0.5) {
      this.xSpeed = 5;
      this.ySpeed = 5;
    } else {
      this.xSpeed = -5;
      this.ySpeed = -5;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 2 * this.r);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkEdges() {
    if (this.y >= height - this.r) {
      this.y = height - this.r;
      this.ySpeed *= -1;
    }

    if (this.y <= this.r) {
      this.y = this.r;
      this.ySpeed *= -1;
    }
  }

  changeDirection(other) {
    let isHigher = this.y < other.y && this.y >= other.y - this.r;
    let isLower =
      this.y > other.y + other.h && this.y <= other.y + other.h + this.r;
    let isUpperQuarter = this.y >= other.y && this.y <= other.y + other.h / 4;
    let isLowerQuarter =
      this.y <= other.y + other.h && this.y >= other.y + (other.h * 3) / 4;
    let isInLeftHitRange =
      this.x < width / 2 &&
      ((this.x <= other.x + other.w + this.r &&
        this.x >= other.x + other.w &&
        this.y >= other.y &&
        this.y <= other.y + other.h) ||
        (this.x <= other.x + other.w &&
          this.x >= other.x &&
          ((this.y <= other.y && this.y >= other.y - this.r) ||
            (this.y >= other.y + other.h &&
              this.y <= other.y + other.h + this.r))));
    let isInRightHitRange =
      this.x > width / 2 &&
      ((this.x >= other.x - this.r &&
        this.x <= other.x &&
        this.y >= other.y &&
        this.y <= other.y + other.h) ||
        (this.x <= other.x + other.w &&
          this.x >= other.x &&
          ((this.y <= other.y && this.y >= other.y - this.r) ||
            (this.y >= other.y + other.h &&
              this.y <= other.y + other.h + this.r))));

    if (isInLeftHitRange) {
      if (isHigher) {
        if (this.ySpeed > 0) {
          if (this.x < other.x + other.w) {
            this.ySpeed *= -1;
          } else {
            this.xSpeed *= -1;
            this.ySpeed *= -1;
          }
        }
      } else if (isLower) {
        if (this.ySpeed < 0) {
          if (this.x < other.x + other.w) {
            this.ySpeed *= -1;
          } else {
            this.xSpeed *= -1;
            this.ySpeed *= -1;
          }
        }
      } else if (isUpperQuarter || isLowerQuarter) {
        if (this.xSpeed < 0) {
          this.xSpeed *= -1.2;
        }
      } else {
        if (this.xSpeed < 0) {
          this.xSpeed *= -1;
        }
      }
    }

    if (isInRightHitRange) {
      if (isHigher) {
        if (this.ySpeed > 0) {
          if (this.x > other.x) {
            this.ySpeed *= -1;
          } else {
            this.xSpeed *= -1;
            this.ySpeed *= -1;
          }
        }
      } else if (isLower) {
        if (this.ySpeed < 0) {
          if (this.x > other.x) {
            this.ySpeed *= -1;
          } else {
            this.xSpeed *= -1;
            this.ySpeed *= -1;
          }
        }
      } else if (isUpperQuarter || isLowerQuarter) {
        if (this.xSpeed > 0) {
          this.xSpeed *= -1.2;
        }
      } else {
        if (this.xSpeed > 0) {
          this.xSpeed *= -1;
        }
      }
    }
  }

  hits(other) {
    let isInLeftHitRange =
      this.x < width / 2 &&
      ((this.x <= other.x + other.w + this.r &&
        this.x >= other.x + other.w &&
        this.y >= other.y &&
        this.y <= other.y + other.h) ||
        (this.x <= other.x + other.w &&
          this.x >= other.x &&
          ((this.y <= other.y && this.y >= other.y - this.r) ||
            (this.y >= other.y + other.h &&
              this.y <= other.y + other.h + this.r))));
    let isInRightHitRange =
      this.x > width / 2 &&
      ((this.x >= other.x - this.r &&
        this.x <= other.x &&
        this.y >= other.y &&
        this.y <= other.y + other.h) ||
        (this.x <= other.x + other.w &&
          this.x >= other.x &&
          ((this.y <= other.y && this.y >= other.y - this.r) ||
            (this.y >= other.y + other.h &&
              this.y <= other.y + other.h + this.r))));

    if (isInLeftHitRange && this.xSpeed < 0) {
      return true;
    } else if (isInRightHitRange && this.xSpeed > 0) {
      return true;
    }

    return false;
  }
}
