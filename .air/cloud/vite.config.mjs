// Air cloud dev-server wrapper: reuses the repo's vite.config.ts and only lets the
// exposed-port proxy hostname through Vite's host check. Product config stays untouched.
import { defineConfig, mergeConfig } from "vite";
import baseConfig from "../../vite.config.ts";

export default defineConfig((env) => {
  const base = typeof baseConfig === "function" ? baseConfig(env) : baseConfig;
  return mergeConfig(base, { server: { host: "0.0.0.0", port: 8080, strictPort: true, allowedHosts: true } });
});
