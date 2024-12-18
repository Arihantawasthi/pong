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
let secondsPassed;
let oldTimestamp: number = 0;
let fps;
let velocity = 50;
let acceleration = 50;

function ballDrop(timestamp: number) {
    secondsPassed = Math.min((timestamp - oldTimestamp) / 1000, 0.1);
    oldTimestamp = timestamp;
    fps = Math.round(1 / secondsPassed)

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
    y += (velocity * secondsPassed);
    velocity += (acceleration * secondsPassed);

    window.requestAnimationFrame(ballDrop);
}

window.requestAnimationFrame(ballDrop);
