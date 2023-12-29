import config from "../config";

export const createCanvas = (anchorId: string) => {
    const canvas = document.createElement("canvas");
    const canvasAnchor = document.getElementById(anchorId) || document.body;
    canvasAnchor.appendChild(canvas);
    return canvas;
};

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
    canvas.style.width = `max(100%, ${config.minGameWidth}px)`;
    canvas.style.height = `max(100%, ${config.minGameHeight}px)`;
};

export const resetResolution = (canvas: HTMLCanvasElement) => {
    canvas.width = Math.max(canvas.clientWidth, config.minGameWidth);
    canvas.height = Math.max(canvas.clientHeight, config.minGameHeight);
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
