import type { Config } from "../@types";
import { y2j } from "../util";
import { Icon } from "./cmd/icon";
import { select, confirm, input, checkbox } from "@inquirer/prompts";

enum MainMenu {
  WatchIcons = "watch icons",
  Studio = "studio",
  Exit = "exit",
}

export class CLI {
  private async _showMainMenu() {
    const choice = await select({
      message: "What do you want to do?",
      choices: [
        {
          name: "Create icons tsx",
          value: MainMenu.WatchIcons,
          description: "Watch icons and generate tsx files",
        },
        {
          name: "Exit",
          value: MainMenu.Exit,
          description: "Exit the application",
        },
      ],
      loop: false,
    });

    return choice;
  }

  public async run() {
    console.log("🎯 Welcome to the Interactive CLI Application!\n");

    while (true) {
      try {
        const choice = await this._showMainMenu();
        switch (choice) {
          case MainMenu.WatchIcons:
            await this._watchIcons();
            break;
          case MainMenu.Exit:
            console.log("👋 Goodbye!");
            process.exit(0);
            break;
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
  }

  private async _watchIcons() {
    const config = await y2j<Config>("config.yaml");
    const iconWatcher = new Icon(
      config.icon.watchPath,
      config.icon.outPath
    );
    await iconWatcher.run();
  }
}
