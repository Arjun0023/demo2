import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Only run ESLint in development mode to avoid build issues
    process.env.NODE_ENV !== 'production' && eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: ['node_modules']
    })
  ].filter(Boolean),
});
