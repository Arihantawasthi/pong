import PongTable from "./pongTable";
import Ball from "./ball";
import Paddle from "./paddle";

class GameControl {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private pongTable: PongTable;
    private paddles: Paddle[];

    constructor() {
        this.pongTable = new PongTable("#game");
        this.canvas = this.pongTable.canvas;
        this.ctx = this.pongTable.ctx;
        this.ball = new Ball(this.canvas, this.ctx);
        this.paddles = [
            new Paddle(
                this.ctx,
                { x: this.canvas.width / 2, y: this.canvas.height - 20 },
                { vx: 0.10, vy: 0 }
            ),
            new Paddle(
                this.ctx,
                { x: this.canvas.width / 2, y: 20 },
                { vx: 0.10, vy: 0 }
            )
        ]
    }

    public draw() {
        this.pongTable.drawField();
        this.ball.drawBall();
        for (let i = 0; i < this.paddles.length; i++) {
            this.paddles[i].drawPaddle();
        }
    }

    public update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.updateBall();
        this.paddles[0].updatePaddle();
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}


window.addEventListener("load", () => {
    const gameControl = new GameControl();
    gameControl.update();
});
