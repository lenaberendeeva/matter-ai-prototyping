// Vite config used ONLY by .air/cloud/startup.sh to serve this app through Air's
// public proxy. It mirrors the repository vite.config.ts and additionally accepts
// the Host header forwarded by the proxy (Vite blocks unknown hosts by default).
// `npm run dev` still uses the repository vite.config.ts and is unaffected.
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

const projectRoot = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => ({
  root: projectRoot,
  server: {
    host: "0.0.0.0",
    port: Number(process.env.VITE_DEV_PORT ?? 8080),
    strictPort: true,
    // The proxy passes its own public hostname through as the Host header.
    allowedHosts: true,
    hmr: {
      overlay: false,
      // The browser reaches the dev server over https on the proxy's 443.
      protocol: "wss",
      clientPort: 443,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "./src"),
    },
  },
}));
