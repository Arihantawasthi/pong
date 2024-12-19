import PongTable from "./pongTable";
import Ball from "./ball";

class GameControl {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private pongTable: PongTable;

    constructor() {
        this.pongTable = new PongTable("#game");
        this.canvas = this.pongTable.canvas;
        this.ctx = this.pongTable.ctx;
        this.ball = new Ball(this.canvas, this.ctx);
    }

    public draw() {
        this.pongTable.drawField();
        this.ball.drawBall();
    }

    public update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.updateBall();
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}


window.addEventListener("load", () => {
    const gameControl = new GameControl();
    gameControl.update();
});
