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
    private isGameRunning: boolean;

    constructor() {
        this.pongTable = new PongTable("#game");
        this.canvas = this.pongTable.canvas;
        this.ctx = this.pongTable.ctx;
        this.ball = new Ball(this.canvas, this.ctx);
        this.paddle1 = new Paddle(this.ctx, { x: this.canvas.width / 2, y: this.canvas.height - 20 }, { vx: 10, vy: 0 });
        this.paddle2 = new Paddle(this.ctx, { x: this.canvas.width / 2, y: 10 }, { vx: 10, vy: 0 });

        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.keys = {};
        this.isGameRunning = false;
        this.startGameWithControl();
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

    private startGameWithControl() {
        let count = 3;
        const countdownInterval = setInterval(() => {
            count--;
            let countElContainer = document.querySelector(".counter") as HTMLElement;
            let countEl = document.querySelector(".counter-text") as HTMLElement;
            if (count > 0) {
                countEl.innerText = (count).toString();
            } else if (count == 0) {
                countEl.innerText = "GO!!";
            } else {
                clearInterval(countdownInterval);
                countElContainer.style.display = "none";
                this.isGameRunning = true;
                this.ball.startMoving();
            }
        }, 1000);
    }

    public update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.isGameRunning) {
            this.draw();
            requestAnimationFrame(this.update.bind(this));
            return;
        }

        this.updatePaddles();
        this.ball.updateBall();
        const { ballX, ballY } = this.ball.getBallPosition();

        const { paddleX, paddleY } = this.paddle1.getPaddlePosition();
        const paddle2X = this.paddle2.getPaddlePosition().paddleX;
        const paddle2Y = this.paddle2.getPaddlePosition().paddleY;

        if (paddleY - 10 < (ballY + this.ball.getRadius()) &&
            ballX > paddleX && ballX < (paddleX + this.paddle1.getPaddleWidth())) {
            this.ball.flipBallVelocity();
        }
        if ((paddle2Y + this.paddle2.getPaddleHeight() + 10) > (ballY - this.ball.getRadius()) &&
            ballX > paddle2X && ballX < (paddle2X + this.paddle2.getPaddleWidth())) {
            this.ball.flipBallVelocity();
        }

        if (ballY - this.ball.getRadius() <= 0) {
            this.ball.resetBall();
            this.startGameWithControl();
        } else if (ballY + this.ball.getRadius() >= this.canvas.height) {
            this.ball.resetBall();
            this.startGameWithControl();
        }
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}


window.addEventListener("load", () => {
    const gameControl = new GameControl();
    gameControl.update();
});
