import { Game } from "../screens/Game";
import Menu from "../screens/Menu";

export default class Renderer {
    private screens = { menu: new Menu(), game: new Game() };
    public screen: keyof typeof this.screens;

    constructor() {
        this.screen = "game";
    }

    render() {
        this.screens[this.screen].render();
    }
}
