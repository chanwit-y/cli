import { $, serve, spawn } from "bun";
import { existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";

export class Studio {
  constructor(private _port: number, private _dir: string) {}

  async run() {
    // console.log(process.cwd())
    // const root = __dirname.replace("/cli/lib/cmd/studio", "");
    const root = __dirname;
    const uiDir = join(root, "../../../", this._dir);
    console.log(uiDir)
    const distDir = join(uiDir, "out");

    // Check dist exists if not build it
    if (!existsSync(distDir)) {
      console.log(chalk.yellow.bold("🔨 Building UI..."));
      await $`cd ${uiDir} && bun run build`;
      console.log(chalk.green.bold("✅ UI built successfully!"));
    }

    // Start the server
    console.log(chalk.blue.bold("🚀 Starting studio server..."));

    const server = serve({
      port: this._port,
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

    console.log(
      chalk.green.bold(
        `✨ Studio is running at ${chalk.underline(
          `http://localhost:${server.port}`
        )}`
      )
    );
    console.log(chalk.gray("💡 Press Ctrl+C to stop the server"));

    // Try to open browser (optional)
    try {
      const openCommand =
        process.platform === "darwin"
          ? "open"
          : process.platform === "win32"
          ? "start"
          : "xdg-open";

      spawn({
        cmd: [openCommand, `http://localhost:${server.port}`],
        stdio: ["ignore", "inherit", "inherit"], // 'inherit' เพื่อให้เห็น output ของ child ใน terminal ของ parent ชั่วคราว
      });
    } catch (error) {
      // Ignore browser opening errors
    }

    // Keep the server running until interrupted
    await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
        console.log(chalk.red.bold("\n🛑 Stopping studio server..."));
        server.stop();
        resolve();
      });
    });
  }
}
