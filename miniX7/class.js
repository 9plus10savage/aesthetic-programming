class Star {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.size = random (10, 30)
    this.opacity = 255
  }

  show() {
    fill(0, 252, 1, this.opacity)
    noStroke()
    rect(this.x, this.y, this.size, this.size * 0.33)
    rect(this.x, this.y, this.size * 0.33, this.size)
  }

  starDestroyer() {
    this.opacity -= 10
  }
}
