import { SEC } from "../utils/time";

export default class FrameManager {
    public fps: number;
    public time: number;
    public lastFrameTime: number;
    public delta: number;

    constructor(private fpsCap: number) {
        this.fps = 0;
        this.lastFrameTime = 0;
    }

    public shouldRender(time: number): boolean {
        this.time = time;
        this.delta = time - this.lastFrameTime;

        const shouldRender = this.delta >= SEC / this.fpsCap;

        if (shouldRender) {
            this.lastFrameTime = time;
            this.fps = SEC / this.delta;
        }

        return shouldRender;
    }
}
