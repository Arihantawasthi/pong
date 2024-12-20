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

    public updatePaddle() {
        window.addEventListener("keydown", event => {
            if(event.key == "ArrowRight" || event.code == "ArrowRight") {
                this.initialPosition.x += this.initialVelocity.vx;
            }
            if(event.key == "ArrowLeft" || event.code == "ArrowLeft") {
                this.initialPosition.x -= this.initialVelocity.vx;
            }
        })
    }
}

export default Paddle;
