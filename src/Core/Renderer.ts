import { Game } from "../screens/Game";
import Menu from "../screens/Menu";

interface Screens {
    menu: Menu;
    game: Game;
}

export default class Renderer {
    private currentScreen: keyof Screens;
    private screens: Screens;

    constructor() {
        this.currentScreen = "game";
        this.screens = {
            menu: new Menu(),
            game: new Game(),
        };
    }

    render() {
        this.screens[this.currentScreen].render();
    }

    get screen() {
        return this.currentScreen;
    }
}
