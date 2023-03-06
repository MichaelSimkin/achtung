import config from "../config";

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const width = Math.max(window.innerWidth, config.minGameWidth);
    const height = Math.max(window.innerHeight, config.minGameHeight);

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
