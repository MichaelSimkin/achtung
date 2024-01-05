import { Player } from "../Components/Player";
import config from "../config";
import { AddPlayerConfig } from "../interface/Player";
import { Settings } from "../interface/Settings";

export class StateManager {
    public settings: Settings;
    public players: Player[] = [];

    constructor() {
        const localSettings = localStorage.getItem(config.localStorageSettingsKey);
        this.settings = localSettings ? JSON.parse(localSettings) : {};
    }

    public addPlayer(playerConfig: AddPlayerConfig) {
        this.players.push(new Player({ ...config.defaultPlayerConfig, ...playerConfig }));
    }

    public removePlayer(player: Player) {
        this.players = this.players.filter((p) => p !== player);
    }
}
