import Core from "../../Core";
import config from "../../config";

export default class Menu {
    constructor() {
        // TODO
    }

    public render() {
        const { ctx } = Core;
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Print FPS top left
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`FPS: ${Core.fps}`, 10, 30);

        // Print Time below FPS
        ctx.fillText(`Time: ${Core.time}`, 10, 60);

        // Print Delta below Time
        ctx.fillText(`Delta: ${Core.delta}`, 10, 90);
    }
}
