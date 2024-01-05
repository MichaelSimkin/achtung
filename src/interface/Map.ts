import { Point } from "../Components/Point";

export interface IMapConfig {
    topLeft: Point;
    size: number; // pixels
    borderWidth: number; // pixels
    borderColor: string; // rgba
    backgroundColor: string; // rgba
}
