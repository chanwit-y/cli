// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  esbuild: {
    // Disable type checking in esbuild for faster builds
    logLevel: 'error'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Your library's entry point
      name: "vegaui", // Global variable name if using UMD
      fileName: (format) => `vegaui.${format}.js`,
      // formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Externalize peer dependencies to avoid bundling them
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
  },
});
