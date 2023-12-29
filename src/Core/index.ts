import config from "../config";
import { CanvasManager } from "./CanvasManager";
import FrameManager from "./FrameManager";
import Renderer from "./Renderer";

export const canvasManager = new CanvasManager(config.canvasAnchorId);
export const frameManager = new FrameManager(config.fpsCap);
export const renderer = new Renderer();

const loop: FrameRequestCallback = (time) => {
    if (frameManager.shouldRender(time)) renderer.render();
    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

export default { canvasManager, frameManager, renderer };
