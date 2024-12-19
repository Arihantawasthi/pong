type Position = {
    x: number;
    y: number;
}

class Ball {
    private radius: number;
    private initialPosition: Position;
    private initialVelocity: number;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.radius = 12;
        this.initialPosition = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        this.initialVelocity = 5;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    public drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.initialPosition.x, this.initialPosition.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    public updateBall() {
        if (this.initialPosition.y > this.canvas.height + this.radius || this.initialPosition.y < 0 - this.radius) {
            return
        }
        this.initialPosition.y -= this.initialVelocity;
    }
}


export default Ball;