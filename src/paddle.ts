import { Position, Velocity } from "./types";

class Paddle {
    private initialPosition: Position;
    private initialVelocity: Velocity;
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, position: Position, velocity: Velocity)  {
        this.width = 150;
        this.height = 10;
        this.initialPosition = {
            x: position.x - this.width / 2,
            y: position.y
        }
        this.initialVelocity = {
            vx: velocity.vx,
            vy: velocity.vy
        }
        this.ctx = ctx;
    }

    public drawPaddle() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.initialPosition.x, this.initialPosition.y, this.width, this.height);
    }

    public moveRight() {
        if (this.initialPosition.x + this.width >= window.innerWidth) {
            return
        }
        this.initialPosition.x += this.initialVelocity.vx;
    }

    public moveLeft() {
        if (this.initialPosition.x <= 0) {
            return
        }
        this.initialPosition.x -= this.initialVelocity.vx;
    }

    public getPaddlePosition() {
        return { paddleX: this.initialPosition.x, paddleY: this.initialPosition.y };
    }

    public getPaddleWidth() {
        return this.width;
    }

    public getPaddleHeight() {
        return this.height;
    }
}

export default Paddle;
