import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Runs the dev server on the origin the backend's CORS config expects
// (http://localhost:5173). See src/api/client.js for the API base URL.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
