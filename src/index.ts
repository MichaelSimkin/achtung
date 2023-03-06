import config from "./config";
import { Game } from "./Game";
import { resizeCanvas } from "./utils/canvas";

const { canvas } = config;

window.addEventListener("resize", () => resizeCanvas(canvas));

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Could not get canvas context");

new Game({
    ctx,
    mapConfig: { size: Math.min(window.innerHeight, window.innerWidth) * 0.9 },
    playerConfigs: [
        { name: "Player 1", color: "rgba(255, 0, 0, 1)", keyRight: "ArrowRight", keyLeft: "ArrowLeft" },
        { name: "Player 2", color: "rgba(0, 255, 0, 1)", keyRight: "KeyD", keyLeft: "KeyA" },
    ],
}).start();
