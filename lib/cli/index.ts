import type { Config } from "../@types";
import { y2j } from "../util";
import { Icon } from "./cmd/icon";
import { select, confirm, input, checkbox } from "@inquirer/prompts";
import { existsSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

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
    console.log("🎯 Welcome to the Interactive CLI Application!\n");

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

  private async _icons() {
    const config = await y2j<Config>("vega.config.yaml");
    const iconWatcher = new Icon(
      config.icon.watchPath,
      config.icon.outPath
    );
    await iconWatcher.run();
  }

  private async _studio() {
    const uiDir = join(process.cwd(), "ui");
    const distDir = join(uiDir, "dist");
   
    // Start the server
    console.log("🚀 Starting studio server...");
    
    const server = Bun.serve({
      port: 3000,
      fetch(req) {
        const url = new URL(req.url);
        let filePath = url.pathname;
        
        // Default to index.html for root path
        if (filePath === "/") {
          filePath = "/index.html";
        }
        
        const fullPath = join(distDir, filePath);
        
        // Check if file exists
        if (existsSync(fullPath)) {
          return new Response(Bun.file(fullPath));
        }
        
        // For SPA routing, serve index.html for non-API routes
        if (!filePath.startsWith("/api") && !filePath.includes(".")) {
          return new Response(Bun.file(join(distDir, "index.html")));
        }
        
        return new Response("Not Found", { status: 404 });
      },
    });
    
    console.log(`✨ Studio is running at http://localhost:${server.port}`);
    console.log("💡 Press Ctrl+C to stop the server");
    
    // Try to open browser (optional)
    try {
      const openCommand = process.platform === "darwin" ? "open" : 
                         process.platform === "win32" ? "start" : "xdg-open";
      spawn(openCommand, [`http://localhost:${server.port}`], { 
        detached: true, 
        stdio: "ignore" 
      });
    } catch (error) {
      // Ignore browser opening errors
    }
    
    // Keep the server running until interrupted
    await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
        console.log("\n🛑 Stopping studio server...");
        server.stop();
        resolve();
      });
    });
  }
}
