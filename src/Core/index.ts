import config from "../config";
import { CanvasManager } from "./CanvasManager";
import FrameManager from "./FrameManager";
import { LoopManager } from "./LoopManager";
import Renderer from "./Renderer";

class Core {
    private canvasManager = new CanvasManager(config.canvasAnchorId);
    private frameManager = new FrameManager(config.fpsCap);
    private renderer: Renderer;
    private loopManager: LoopManager;

    constructor() {}

    public start() {
        this.renderer = new Renderer();
        this.loopManager = new LoopManager(this.frameManager, this.renderer);
    }

    public pause = () => this.loopManager.pause();

    public resume = () => this.loopManager.resume();

    public switchScreen(screen: keyof Renderer["screens"]) {
        this.renderer.screen = screen;
    }

    get canvas() {
        return this.canvasManager.canvas;
    }

    get ctx() {
        return this.canvasManager.ctx;
    }

    get fps() {
        return this.frameManager.fps;
    }

    get time() {
        return this.frameManager.time;
    }

    get delta() {
        return this.frameManager.delta;
    }

    get screen() {
        return this.renderer.screen;
    }

    get paused() {
        return this.loopManager.paused;
    }
}

export default new Core();
