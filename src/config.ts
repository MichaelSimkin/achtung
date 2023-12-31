import { Point } from "./Components/Point";
import { turnDirection } from "./interface/Player";

const config = {
    minGameWidth: 500,
    minGameHeight: 400,

    canvasAnchorId: "achtung",

    backgroundColor: "rgba(0, 0, 0, 1)",

    fpsCap: 240,

    localStorageSettingsKey: "achtung-settings",

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
        angle: 0,
        position: new Point(0, 0),
        alive: true,
    },
};

export default config;
