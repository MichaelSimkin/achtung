import { Point } from "../../Components/Point";
import { IMapConfig } from "../../interface/Map";

export class Map {
    public topLeft: Point;
    public size: number;

    public borderWidth: number;
    public borderColor: string;

    public backgroundColor: string;

    private state: ImageData;

    constructor(config: IMapConfig) {
        Object.assign(this, config);
    }

    private drawBorder(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.topLeft.x, this.topLeft.y, this.size, this.size);
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = this.borderColor;
        ctx.stroke();
    }

    public clear(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.topLeft.x, this.topLeft.y, this.size, this.size);
        this.drawBorder(ctx);
        this.saveState(ctx);
    }

    public saveState(ctx: CanvasRenderingContext2D) {
        this.state = ctx.getImageData(this.topLeft.x, this.topLeft.y, this.size, this.size);
    }

    public restoreState(ctx: CanvasRenderingContext2D) {
        ctx.putImageData(this.state, this.topLeft.x, this.topLeft.y);
    }
}
