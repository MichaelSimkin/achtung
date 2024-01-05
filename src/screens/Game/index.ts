import { Point } from "../../Components/Point";
import Core from "../../Core";
import config from "../../config";
import { IMapConfig } from "../../interface/Map";
import { Screen } from "../../interface/Screen";
import { SEC } from "../../utils/time";
import { PartialProps } from "../../utils/types";
import { Map } from "./Map";

type GameMapConfig = PartialProps<IMapConfig, keyof typeof config.defaultMapConfig>;

export class Game implements Screen {
    private map: Map;

    private paused = false;
    private roundPlaying = false;

    constructor() {
        const { width, height } = Core.canvas;
        this.initMap({ size: Math.min(width, height) * 0.9 });
    }

    public render() {
        if (!this.paused) this.draw(Core.time, Core.delta);
    }

    public init() {
        window.addEventListener("keypress", this.spaceHandler);
        Core.players.forEach((player) => player.init());
    }

    public destroy() {
        window.removeEventListener("keypress", this.spaceHandler);
        Core.players.forEach((player) => player.destroy());
    }

    private spaceHandler = (e: KeyboardEvent) => {
        if (e.code === "Space") {
            this.paused = !this.paused;
        }
    };

    public resetMapLocation() {
        const { width, height } = Core.canvas;
        const { size } = this.map;
        this.map.topLeft = new Point((width - size) / 2, (height - size) / 2);
    }

    public pause(ms?: number) {
        this.paused = true;
        if (ms) setTimeout(() => (this.paused = false), ms);
    }

    public clipToMap() {
        const offset = this.map.borderWidth / 2 - 1;

        Core.ctx.beginPath();
        Core.ctx.rect(
            this.map.topLeft.x + offset,
            this.map.topLeft.y + offset,
            this.map.size - 2 * offset,
            this.map.size - 2 * offset
        );
        Core.ctx.clip();
    }

    public handleRoundEnd() {
        if (!this.roundPlaying) {
            this.roundPlaying = true;
            this.map.clear(Core.ctx);
            this.resetPlayers();
            this.pause(SEC);
        }

        if (Core.players.filter((player) => player.alive).length === 0) {
            this.roundPlaying = false;
            this.pause();
        }
    }

    public draw(_time: number, ms: number) {
        this.handleRoundEnd();
        Core.clearCanvas();
        this.drawMap(ms);
    }

    private drawMap(ms: number) {
        Core.ctx.save();

        this.map.restoreState(Core.ctx);

        this.clipToMap();

        Core.players.forEach((player) => {
            player.checkMapCollision(this.map);
            player.update(Core.ctx, ms);
        });

        this.map.saveState(Core.ctx);

        Core.players.forEach((player) => {
            player.drawPlayer(Core.ctx);
        });

        Core.ctx.restore();
    }

    public initMap(mapConfig: GameMapConfig) {
        this.map = new Map({ ...config.defaultMapConfig, ...mapConfig });
        this.resetMapLocation();
        this.map.clear(Core.ctx);
    }

    public resetPlayers() {
        Core.players.forEach((player) => {
            Object.assign(player, config.defaultPlayerConfig);
            player.randomizeLocationOnMap(this.map);
        });
    }
}
