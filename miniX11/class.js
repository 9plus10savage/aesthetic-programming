class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 0.75);
		this.t = random(TAU);
	}

	show() {
		let scale = this.size + sin(this.t) * 2;
		this.t += 0.2
		fill(255)
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}
