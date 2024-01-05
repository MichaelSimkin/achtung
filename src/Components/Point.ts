export class Point {
    public x: number;
    public y: number;

    constructor(...args: [number, number] | [[number, number]] | [{ x: number; y: number }]) {
        if (args.length === 2) [this.x, this.y] = args;
        else if (Array.isArray(args[0])) [[this.x, this.y]] = args;
        else [{ x: this.x, y: this.y }] = args;
    }

    public equals(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    public clone() {
        return new Point(this.x, this.y);
    }

    public add(point: Point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    public subtract(point: Point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    public multiply(point: Point) {
        this.x *= point.x;
        this.y *= point.y;
        return this;
    }

    public multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public addScalar(scalar: number) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    public move(angle: number, distance: number) {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
        return this;
    }

    public distance(point: Point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

    public isInSquare(topLeft: Point, size: number) {
        return this.x >= topLeft.x && this.x <= topLeft.x + size && this.y >= topLeft.y && this.y <= topLeft.y + size;
    }

    public static getRandomPoint(topLeft: Point, size: number) {
        return new Point(topLeft.x + Math.random() * size, topLeft.y + Math.random() * size);
    }
}
