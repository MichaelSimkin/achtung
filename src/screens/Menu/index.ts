import Core from "../../Core";
import config from "../../config";
import { Screen } from "../../interface/Screen";

export default class Menu implements Screen {
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

        // Start button in center
        const message = "Press anywhere to start";
        ctx.fillText(message, ctx.canvas.width / 2 - ctx.measureText(message).width / 2, ctx.canvas.height / 2);
    }

    public init() {
        Core.canvas.addEventListener("click", this.startGame);
    }

    public destroy() {
        Core.canvas.removeEventListener("click", this.startGame);
    }

    private startGame() {
        Core.addPlayer({ name: "Player 2", color: "blue", keyLeft: "ArrowLeft", keyRight: "ArrowRight" });
        Core.setScreen("game");
        // TODO
    }
}
