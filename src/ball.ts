import { Position, Velocity } from "./types";

class Ball {
    private radius: number;
    private initialPosition: Position;
    private initialVelocity: Velocity;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.radius = 12;
        this.initialPosition = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        this.initialVelocity = {
            vx: 0,
            vy: 0,
        };
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

    public startMoving() {
        this.initialVelocity.vx = 5;
        this.initialVelocity.vy = 8;
    }

    public updateBall() {
        if (this.initialPosition.x < 0 + this.radius ||
            this.initialPosition.x > this.canvas.width - this.radius
        ) {
            this.initialVelocity.vx *= -1;
        }

        this.initialPosition.y += this.initialVelocity.vy;
        this.initialPosition.x += this.initialVelocity.vx;
    }

    public getBallPosition() {
        return { ballX: this.initialPosition.x, ballY: this.initialPosition.y };
    }

    public getBallVelocity() {
        return { ballVX: this.initialVelocity.vx, ballVY: this.initialVelocity.vy };
    }

    public flipBallVelocity() {
        this.initialVelocity.vy += 1;
        this.initialVelocity.vy *= -1;
    }

    public getRadius() {
        return this.radius;
    }

    public resetBall() {
        this.initialPosition = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.initialVelocity = {
            vx: 5,
            vy: 8
        };

    }
}

export default Ball;
