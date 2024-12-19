class PongTable {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvasId: string) {
        if (!canvasId.startsWith("#")) {
            throw new Error("Canvas Id should start with '#'");
        }
        this.canvas = document.querySelector(`${canvasId}`) as HTMLCanvasElement;
        if (!this.canvas) {
            throw new Error(`Canvas with ${canvasId} ID not found`);
        }

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error(`Context for canvas ${canvasId} not found`);
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public drawField() {
        this.ctx.fillStyle = "#bbb";
        this.ctx.fillRect(0, (this.canvas.height / 2) - 4, this.canvas.width, 8);

        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2), 150, 0, 2 * Math.PI)
        this.ctx.lineWidth = 8;
        this.ctx.strokeStyle = "#bbb";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo((this.canvas.width / 2) - 300, this.canvas.height);
        this.ctx.lineTo((this.canvas.width / 2) - 300, this.canvas.height - 150);
        this.ctx.lineTo(((this.canvas.width / 2) - 300) + 600, this.canvas.height - 150);
        this.ctx.lineTo(((this.canvas.width / 2) - 300) + 600, this.canvas.height);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo((this.canvas.width / 2) - 300, 0);
        this.ctx.lineTo((this.canvas.width / 2) - 300, 150);
        this.ctx.lineTo(((this.canvas.width / 2) - 300) + 600, 150);
        this.ctx.lineTo(((this.canvas.width / 2) - 300) + 600, 0);
        this.ctx.stroke();

        this.drawBall();
    }

    public drawBall() {
        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width / 2), this.canvas.height / 2, 12, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}

const pong = new PongTable("#game");
pong.drawField();
