import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const repoName = "my-website";

// Use the function signature to access 'command'
export default defineConfig(({ command }) => {
  return {
    // ⭐️ FIX: Check if the command is 'build' (production)
    base: command === 'build' 
      ? `/${repoName}/` 
      : '/',

    plugins: [
      tailwindcss(), 
      reactRouter(), 
      tsconfigPaths()
    ],

  };
});
