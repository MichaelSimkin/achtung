import { Game } from "../screens/Game";
import Menu from "../screens/Menu";

export default class Renderer {
    public screens = { menu: new Menu(), game: new Game() };
    public screen: keyof typeof this.screens;

    constructor() {
        this.screen = "menu";
        this.screens[this.screen].init();
    }

    public setScreen(screen: keyof typeof this.screens) {
        this.screens[this.screen].destroy();
        this.screen = screen;
        this.screens[this.screen].init();
    }

    render() {
        this.screens[this.screen].render();
    }
}
