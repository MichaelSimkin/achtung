import { SEC } from "../utils/time";

export default class FrameManager {
    private fps: number;
    private time: number;
    private lastFrameTime: number;
    private delta: number;

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

    get frameRate() {
        return this.fps;
    }

    get currentTime() {
        return this.time;
    }

    get deltaTime() {
        return this.delta;
    }
}
