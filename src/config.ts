import { turnDirection } from "./Player";
import { Point } from "./utils/point";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

const config = {
    canvas,

    minGameWidth: 1000,
    minGameHeight: 800,

    backgroundColor: "rgba(0, 0, 0, 1)",

    defaultMapConfig: {
        topLeft: new Point(0, 0),
        size: 800,
        borderWidth: 5,
        borderColor: "rgb(255, 255, 0, 1)",
        backgroundColor: "rgba(0, 0, 0, 1)",
    },

    defaultPlayerConfig: {
        headColor: "rgba(255, 255, 0, 1)",
        width: 10,
        speed: 0.15,
        turnRadius: 50,
        turnDirection: "none" as turnDirection,
        gapWidth: 30,
        gapInterval: 500,
    },
};

export default config;
