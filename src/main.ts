const canvas: HTMLCanvasElement | null = document.querySelector("#game");
if (!canvas) {
    throw new Error("Canvas element not found");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d")
if (!ctx) {
    throw new Error("Error getting the context from canvas");
}

let y = 0;

function ballDrop() {
    if (!ctx || !canvas) {
        throw new Error("Canvas or Context doesn't exist");
    }
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 0;
    ctx.stroke();
    y++;

    requestAnimationFrame(ballDrop);
}

ballDrop();
