import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const repoName = "my-website";

export default defineConfig({

  base: process.env.NODE_ENV === 'production' 
    ? `/${repoName}/` 
    : '/',

  plugins: [tailwindcss(), reactRouter(), 
  tsconfigPaths()],

  build: {
    // Ensures the final files are in the 'dist' folder
    outDir: 'dist', 
  },
});
