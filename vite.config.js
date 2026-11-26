import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import pkg from "./package.json";

// Libraries the host app (Mirador / MMU) provides: never bundled, deep
// imports included (@mui/icons-material/Delete, react/jsx-runtime...), so the
// plugin uses the host's React, Redux, i18n, Emotion and MUI instances.
const hostPackages = Object.keys(pkg.peerDependencies || {});
const isExternal = (id) =>
  hostPackages.some((name) => id === name || id.startsWith(`${name}/`)) ||
  /^(__tests__|__mocks__)\//.test(id);

const safeName = pkg.name.replace(/[^a-zA-Z0-9]/g, "");
const baseName = pkg.name.startsWith("/") ? pkg.name : `/${pkg.name}/`;

export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? (process.env.BASE_PATH || baseName)
    : "/",

  ...(process.env.GITHUB_PAGES
    ? {
      build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
          external: isExternal,
          input: fileURLToPath(new URL("./demo/src/index.html", import.meta.url)),
        },
        sourcemap: true,
      },
    }
    : {
      build: {
        lib: {
          entry: "./src/index.js",
          fileName: (format) => (format === 'umd' ? 'mirador-mltools-plugin.js' : 'mirador-mltools-plugin.es.js'), // TODO it's not safe to hardcode this with different name than package name
          formats: ["es", "umd"],
          name: safeName,
        },
        rollupOptions: {
          external: isExternal,
          output: {
            assetFileNames: `${pkg.name}.[ext]`,
          },
        },
        sourcemap: true,
      },
      esbuild: {
        exclude: [],
        include: [/__tests__\/.*\.(js|jsx)$/, /src\/.*\.jsx?$/],
        loader: "jsx",
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [
            {
              name: "load-js-files-as-jsx",
              setup(build) {
                build.onLoad({ filter: /(src|__tests__)\/.*\.js$/ }, async (args) => ({
                  contents: await fs.readFile(args.path, "utf8"),
                  loader: "jsx",
                }));
              },
            },
          ],
        },
        include: ["@emotion/react"],
      },
      plugins: [react()],
      resolve: {
        alias: {
          "@tests/": fileURLToPath(new URL("./__tests__", import.meta.url)),
        },
      },
      server: {
        open: "/demo/src/index.html",
        port: 4444,
      },
    }),
});
