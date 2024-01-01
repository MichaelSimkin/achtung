import { createCanvas, resetResolution, resizeCanvas } from "../utils/canvas";

export class CanvasManager {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    constructor(anchorId: string) {
        this.canvas = createCanvas(anchorId);
        this.ctx = this.getContext();
        this.initCanvas();
    }

    private getContext() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get context from canvas");
        return ctx;
    }

    private initCanvas() {
        resizeCanvas(this.canvas);
        resetResolution(this.canvas);
        window.addEventListener("resize", () => resetResolution(this.canvas));
    }
}
