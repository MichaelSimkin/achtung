import { canvasManager, frameManager } from "../../Core";
import config from "../../config";
import { Point } from "../../utils/point";
import { SEC } from "../../utils/time";
import { PartialProps } from "../../utils/types";
import { IMapConfig, Map } from "./Map";
import { IPlayerConfig, Player } from "./Player";

type GameMapConfig = PartialProps<IMapConfig, keyof typeof config.defaultMapConfig>;
type GamePlayerConfig = PartialProps<IPlayerConfig, keyof typeof config.defaultPlayerConfig | "angle" | "position">;

export class Game {
    public ctx: CanvasRenderingContext2D;

    private map: Map;

    private players: Player[] = [];

    // TODO public scoreBoard: ScoreBoard;

    private paused = false;

    private roundPlaying = false;

    constructor() {
        this.ctx = canvasManager.ctx;

        this.initMap({ size: Math.min(this.ctx.canvas.clientHeight, this.ctx.canvas.clientWidth) * 0.9 });

        this.initPlayers([
            { name: "Player 1", color: "rgba(255, 0, 0, 1)", keyRight: "ArrowRight", keyLeft: "ArrowLeft" },
            { name: "Player 2", color: "rgba(0, 255, 0, 1)", keyRight: "KeyD", keyLeft: "KeyA" },
        ]);

        this.initListeners();
    }

    public initListeners() {
        window.addEventListener("keypress", (e) => {
            if (e.code === "Space") {
                this.paused = !this.paused;
            }
        });
    }

    public render() {
        if (!this.paused) this.draw(frameManager.currentTime, frameManager.deltaTime);
    }

    public resetMapLocation() {
        const [{ width, height }, { size }] = [this.ctx.canvas, this.map];
        this.map.topLeft = new Point((width - size) / 2, (height - size) / 2);
    }

    public pause(ms?: number) {
        this.paused = true;
        if (ms) setTimeout(() => (this.paused = false), ms);
    }

    public clearCanvas() {
        this.ctx.fillStyle = config.backgroundColor;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    public clipToMap() {
        const offset = this.map.borderWidth / 2 - 1;

        this.ctx.beginPath();
        this.ctx.rect(
            this.map.topLeft.x + offset,
            this.map.topLeft.y + offset,
            this.map.size - 2 * offset,
            this.map.size - 2 * offset
        );
        this.ctx.clip();
    }

    public handleRoundEnd() {
        if (!this.roundPlaying) {
            this.roundPlaying = true;
            this.map.clear(this.ctx);
            this.resetPlayers();
            this.pause(SEC);
        }

        if (this.players.filter((player) => player.alive).length <= 1) {
            this.roundPlaying = false;
            this.pause();
        }
    }

    public draw(_time: number, ms: number) {
        this.handleRoundEnd();

        this.clearCanvas();
        this.drawMap(ms);
        this.drawScoreBoard();
    }

    private drawMap(ms: number) {
        this.ctx.save();

        this.map.restoreState(this.ctx);

        this.clipToMap();

        this.players.forEach((player) => {
            player.checkMapCollision(this.map);
            player.update(this.ctx, ms);
        });

        this.map.saveState(this.ctx);

        this.players.forEach((player) => {
            player.drawPlayer(this.ctx);
        });

        this.ctx.restore();
    }

    private drawScoreBoard() {
        // TODO
    }

    public initMap(mapConfig: GameMapConfig) {
        this.map = new Map({ ...config.defaultMapConfig, ...mapConfig });
        this.resetMapLocation();
        this.map.clear(this.ctx);
    }

    public initPlayers(playerConfigs: GamePlayerConfig[]) {
        this.players = playerConfigs.map(
            (playerConfig) => new Player({ ...config.defaultPlayerConfig, ...playerConfig })
        );
    }

    public resetPlayers() {
        this.players.forEach((player) => {
            Object.assign(player, config.defaultPlayerConfig);
            player.alive = true;
            player.angle = Math.random() * 2 * Math.PI;
            player.position = Point.getRandomPoint(
                this.map.topLeft.clone().addScalar(2 * player.turnRadius),
                this.map.size - 4 * player.turnRadius
            );
        });
    }

    public removePlayer(player: Player) {
        this.players = this.players.filter((p) => p !== player);
    }
}
