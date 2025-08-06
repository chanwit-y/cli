import type { Config } from "../@types";
import { y2j } from "../util";
import { Icon } from "./cmd/icon";
import { select } from "@inquirer/prompts";
import { Studio } from "./cmd/studio";
import chalk from "chalk";

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
          name: "Studio",
          value: MainMenu.Studio,
          description: "Open the studio",
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
    console.log(chalk.cyan.bold("🎯 Welcome to the Interactive CLI Application!\n"));

    while (true) {
      try {
        const choice = await this._showMainMenu();
        switch (choice) {
          case MainMenu.WatchIcons:
            await this._icons();
            break;
          case MainMenu.Studio:
            await this._studio();
            break;
          case MainMenu.Exit:
            console.log(chalk.yellow("👋 Goodbye!"));
            process.exit(0);
            break;
        }
      } catch (err) {
        console.error(chalk.red("❌ Error:"), err);
      } finally {
      }
    }
  }

  private async _icons() {
    const config = await y2j<Config>("vega.config.yaml");
    const iconWatcher = new Icon(config.icon.watchPath, config.icon.outPath);
    await iconWatcher.run();
  }

  private async _studio() {
    const studio = new Studio(3000, "app/web");
    await studio.run();
  }
}
