function Pipe() {
    this.spacing = 175;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;

    this.highlight = false;

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    };

    this.show = function() {
        fill(34,139,34);
        if (this.highlight) {
            fill(255, 0, 0);
        }

        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    };

    this.update = function() {
        this.x -= this.speed;
    };
    this.updateSpeed = function() {
        if (frameCount % 400 == 0) {
            this.speed = this.speed + 3;
        }
        if (frameCount % 200 == 0) {
            this.speed = this.speed -2;
        }
    };

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}