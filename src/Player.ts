import config from "./config";
import { Map } from "./Map";
import { getCircleCircumferenceIndexes } from "./utils/circle";
import { Point } from "./utils/point";

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
}

export class Player {
    public name: string;
    public color: string;
    private headColor: string;
    private keyRight: string;
    private keyLeft: string;

    private keyRightPressed = false;
    private keyLeftPressed = false;

    public position: Point;
    public width: number;
    private speed: number;
    public angle: number;
    public turnRadius: number;
    private turnDirection: turnDirection;
    private gapWidth: number;
    private gapInterval: number;

    private distanceTraveled = 0;
    private nextGap = 0;

    public alive = true;

    public drawTrail = true;

    constructor(config: IPlayerConfig) {
        Object.assign(this, config);
        this.initEventListeners();
    }

    public destroy() {
        this.stopEventListeners();
    }

    private initEventListeners() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }

    private stopEventListeners() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === this.keyRight) {
            this.keyRightPressed = true;
            this.turnDirection = "right";
        }
        if (e.code === this.keyLeft) {
            this.keyLeftPressed = true;
            this.turnDirection = "left";
        }
    };

    private handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === this.keyRight) {
            this.keyRightPressed = false;
            this.turnDirection = this.keyLeftPressed ? "left" : "none";
        }
        if (e.code === this.keyLeft) {
            this.keyLeftPressed = false;
            this.turnDirection = this.keyRightPressed ? "right" : "none";
        }
    };

    public update(ctx: CanvasRenderingContext2D, ms: number) {
        if (!this.alive) return;

        const startPosition = this.position.clone();
        const distance = ms * this.speed;

        this.move(distance);

        this.drawPath(ctx, startPosition.move(this.angle, -1), distance + 1);

        this.alive = !(this.drawTrail && this.checkCollision(ctx));

        this.distanceTraveled += distance;

        const afterGap = this.distanceTraveled > this.nextGap + this.gapWidth;
        if (afterGap) this.nextGap = this.distanceTraveled + Math.random() * this.gapInterval;
        this.drawTrail = afterGap || this.distanceTraveled < this.nextGap;
    }

    private move(distance: number) {
        if (this.turnDirection === "none") {
            this.position.move(this.angle, distance);
        } else {
            const turnCoefficient = this.turnDirection === "right" ? 1 : -1;
            const turnAngle = distance / this.turnRadius;

            this.position.move(
                this.angle + turnCoefficient * (turnAngle / 2),
                this.turnRadius * (Math.sin(turnAngle) / Math.cos(turnAngle / 2))
            );

            this.rotate(turnCoefficient * turnAngle);
        }
    }

    public rotate(angle: number) {
        this.angle += angle % (2 * Math.PI);
        this.angle += this.angle < 0 ? 2 * Math.PI : 0;
    }

    public checkCollision(ctx: CanvasRenderingContext2D, allowedColors = [config.defaultMapConfig.backgroundColor]) {
        const { position, width } = this;

        const radius = width / 2;

        const { data } = ctx.getImageData(position.x - radius, position.y - radius, 2 * radius, 2 * radius);

        const angleBuffer = Math.PI / radius;

        const indexes = getCircleCircumferenceIndexes(
            radius,
            this.angle - Math.PI / 2 + angleBuffer,
            this.angle + Math.PI / 2 - angleBuffer
        );

        for (const index of indexes) {
            const [r, g, b, a] = data.slice(index * 4, index * 4 + 4);
            const color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            if (!allowedColors.includes(color)) return true;
        }

        return false;
    }

    public drawPlayer(ctx: CanvasRenderingContext2D) {
        const { position, width } = this;
        ctx.fillStyle = this.headColor;
        ctx.beginPath();
        ctx.arc(position.x, position.y, width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    private drawPath(ctx: CanvasRenderingContext2D, startPosition: Point, distance: number) {
        if (!this.drawTrail) return;

        if (this.turnDirection === "none") {
            this.drawStraightPath(ctx, startPosition, distance);
        } else {
            this.drawTurnPath(ctx, startPosition, distance);
        }
    }

    private drawStraightPath(ctx: CanvasRenderingContext2D, startPosition: Point, distance: number) {
        const endPosition = startPosition.clone().move(this.angle, distance);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(endPosition.x, endPosition.y);
        ctx.stroke();
    }

    private drawTurnPath(ctx: CanvasRenderingContext2D, startPosition: Point, distance: number) {
        const turnCoefficient = this.turnDirection === "right" ? 1 : -1;

        const circleCenter = startPosition.clone().move(this.angle + turnCoefficient * (Math.PI / 2), this.turnRadius);
        const turnStartAngle = this.angle - turnCoefficient * (Math.PI / 2);
        const circleAngle = distance / this.turnRadius;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.arc(
            circleCenter.x,
            circleCenter.y,
            this.turnRadius,
            turnStartAngle,
            turnStartAngle + turnCoefficient * circleAngle,
            this.turnDirection === "left"
        );
        ctx.stroke();
    }

    public checkMapCollision(map: Map) {
        const offset = this.width / 2 + map.borderWidth / 2 - 1;
        const topLeftBounds = map.topLeft.clone().addScalar(offset);
        const sizeBounds = map.size - 2 * offset;
        const isInBounds = this.position.isInSquare(topLeftBounds, sizeBounds);
        this.alive &&= !this.drawTrail || isInBounds;
    }
}
