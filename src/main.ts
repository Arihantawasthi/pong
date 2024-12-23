import PongTable from "./pongTable";
import Ball from "./ball";
import Paddle from "./paddle";

class GameControl {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private pongTable: PongTable;
    private paddle1: Paddle;
    private paddle2: Paddle;
    private keys: { [key: string]: boolean } = {};

    constructor() {
        this.pongTable = new PongTable("#game");
        this.canvas = this.pongTable.canvas;
        this.ctx = this.pongTable.ctx;
        this.ball = new Ball(this.canvas, this.ctx);
        this.paddle1 = new Paddle(this.ctx, { x: this.canvas.width / 2, y: this.canvas.height - 20 }, { vx: 10, vy: 0 });
        this.paddle2 = new Paddle(this.ctx, { x: this.canvas.width / 2, y: 20 }, { vx: 10, vy: 0 });

        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.keys = {};

    }

    public draw() {
        this.pongTable.drawField();
        this.ball.drawBall();
        this.paddle1.drawPaddle();
        this.paddle2.drawPaddle();
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.keys[event.key] = true;
    }
    private handleKeyUp(event: KeyboardEvent) {
        this.keys[event.key] = false;
    }

    private updatePaddles() {
        if (this.keys["ArrowRight"]) this.paddle1.moveRight();
        if (this.keys["ArrowLeft"]) this.paddle1.moveLeft();
        if (this.keys["d"]) this.paddle2.moveRight();
        if (this.keys["a"]) this.paddle2.moveLeft();
    }

    public update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.updateBall();
        this.updatePaddles();
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}


window.addEventListener("load", () => {
    const gameControl = new GameControl();
    gameControl.update();
});
