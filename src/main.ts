import PongTable from "./pongTable";
import Ball from "./ball";
import Paddle from "./paddle";
import { Score } from "./types";

class GameControl {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private pongTable: PongTable;
    private paddle1: Paddle;
    private paddle2: Paddle;
    private keys: { [key: string]: boolean } = {};
    private isGameRunning: boolean;
    private score: Score;
    private player1ScoreEl: HTMLElement;
    private player2ScoreEl: HTMLElement;
    private gameOver:  HTMLElement;
    private playBtn:  HTMLElement;
    private leftBtn: HTMLElement;
    private rightBtn: HTMLElement;

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
        this.score = {
            player1: 0,
            player2: 0,
        }
        this.player1ScoreEl = document.querySelector("#player-1-score") as HTMLElement;
        this.player2ScoreEl = document.querySelector("#player-2-score") as HTMLElement;
        this.gameOver = document.querySelector(".game-over") as HTMLElement;
        this.playBtn = document.querySelector(".btn") as HTMLElement;
        this.player1ScoreEl.innerHTML = this.score.player1.toString();
        this.player2ScoreEl.innerHTML = this.score.player2.toString();
        this.gameOver.innerHTML = "";
        this.playBtn.addEventListener("click", () => {
            this.startGameWithControl()
        })
        this.leftBtn = document.querySelector(".control-left") as HTMLElement;
        this.rightBtn = document.querySelector(".control-right") as HTMLElement;
        this.leftBtn.addEventListener("touchstart", event => {
            event.preventDefault();
            this.keys["ArrowLeft"] = true;
        });
        this.rightBtn.addEventListener("touchstart", event => {
            event.preventDefault();
            this.keys["ArrowRight"] = true;
        });
        this.leftBtn.addEventListener("touchend", event => {
            event.preventDefault();
            this.keys["ArrowLeft"] = false;
        });
        this.rightBtn.addEventListener("touchend", event => {
            event.preventDefault();
            this.keys["ArrowRight"] = false;
        });
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

        const { ballX } = this.ball.getBallPosition();
        const { paddleX } = this.paddle2.getPaddlePosition();

        if (ballX + 40 > paddleX + this.paddle2.getPaddleWidth()) {
            this.paddle2.moveRight();
        }
        if (ballX + 40 < paddleX + this.paddle2.getPaddleWidth()) {
            this.paddle2.moveLeft();
        }
    }

    private startGameWithControl() {
        let count = 3;
        const countdownInterval = setInterval(() => {
            count--;
            let countElContainer = document.querySelector(".counter") as HTMLElement;
            let countEl = document.querySelector(".counter-text") as HTMLElement;
            countElContainer.style.display = "block";
            this.playBtn.style.display = "none";
            this.gameOver.style.display = "none";
            this.player1ScoreEl.innerHTML = this.score.player1.toString();
            this.player2ScoreEl.innerHTML = this.score.player2.toString();

            if (count > 0) {
                countEl.innerText = (count).toString();
            } else if (count == 0) {
                countEl.innerText = "GO!!";
            } else {
                clearInterval(countdownInterval);
                countElContainer.style.display = "none";
                this.gameOver.style.display = "none";
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
            this.score.player1 += 1;
            this.player1ScoreEl.innerHTML = this.score.player1.toString();

            if (this.score.player1 == 5) {
                this.isGameRunning = false;
                this.gameOver.style.display = "block";
                this.gameOver.innerHTML = "You Won!";
                this.playBtn.style.display = "block";
                this.score.player1 = 0;
            }
        } else if (ballY + this.ball.getRadius() >= this.canvas.height) {
            this.ball.resetBall();
            this.score.player2 += 1;
            this.player2ScoreEl.innerHTML = this.score.player2.toString();

            if (this.score.player2 == 5) {
                this.isGameRunning = false;
                this.gameOver.style.display = "block";
                this.gameOver.innerHTML = "You Lost!";
                this.playBtn.style.display = "block";
                this.score.player2 = 0;
            }
        }
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}


window.addEventListener("load", () => {
    const gameControl = new GameControl();
    gameControl.update();
});
