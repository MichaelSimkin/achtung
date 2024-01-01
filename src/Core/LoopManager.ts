import FrameManager from "./FrameManager";
import Renderer from "./Renderer";

export class LoopManager {
    public paused = false;

    constructor(
        private frameManager: FrameManager,
        private renderer: Renderer
    ) {
        requestAnimationFrame(this.loop);
    }

    private loop: FrameRequestCallback = (time) => {
        if (this.frameManager.shouldRender(time)) this.renderer.render();
        if (!this.paused) requestAnimationFrame(this.loop);
    };

    public pause() {
        this.paused = true;
    }

    public resume() {
        this.paused = false;
        requestAnimationFrame(this.loop);
    }
}
