import { Point } from "../Components/Point";
import config from "../config";
import { PartialProps } from "../utils/types";

export type turnDirection = "left" | "right" | "none";

export interface IPlayerConfig {
    name: string;
    color: string; // rgba
    headColor: string; // rgba
    keyRight: string; // key code
    keyLeft: string; // key code

    position: Point;
    width: number; // pixels
    speed: number; // pixels per millisecond
    angle: number; // radians
    turnRadius: number; // pixels
    turnDirection: turnDirection;
    gapWidth: number; // pixels
    gapInterval: number; // pixels

    alive: boolean;
}

export type AddPlayerConfig = PartialProps<IPlayerConfig, keyof typeof config.defaultPlayerConfig>;
