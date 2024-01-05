import config from "../config";
import { AddPlayerConfig } from "../interface/Player";
import { CanvasManager } from "./CanvasManager";
import FrameManager from "./FrameManager";
import { LoopManager } from "./LoopManager";
import Renderer from "./Renderer";
import { StateManager } from "./StateManager";

class Core {
    private canvasManager = new CanvasManager(config.canvasAnchorId);
    private frameManager = new FrameManager(config.fpsCap);
    private stateManager = new StateManager();
    private renderer: Renderer;
    private loopManager: LoopManager;

    constructor() {}

    public start() {
        this.renderer = new Renderer();
        this.loopManager = new LoopManager(this.frameManager, this.renderer);
    }

    public pause = () => this.loopManager.pause();

    public resume = () => this.loopManager.resume();

    public setScreen = (screen: keyof typeof this.renderer.screens) => this.renderer.setScreen(screen);

    public addPlayer = (config: AddPlayerConfig) => this.stateManager.addPlayer(config);

    public clearCanvas = () => this.canvasManager.clearCanvas();

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

    get settings() {
        return this.stateManager.settings;
    }

    get players() {
        return this.stateManager.players;
    }
}

export default new Core();
