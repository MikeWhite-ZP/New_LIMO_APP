import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  // Resolve the vite config if it's a function (from defineConfig with async callback)
  const resolvedConfig = typeof viteConfig === 'function' 
    ? await viteConfig({ command: 'serve', mode: 'development' })
    : viteConfig;

  const vite = await createViteServer({
    ...resolvedConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  
  // SPA fallback: serve index.html for all non-API routes
  app.use(async (req, res, next) => {
    // Skip for API routes, Vite internal requests, and actual files
    if (req.path.startsWith("/api") || 
        req.path.startsWith("/@") ||
        req.path.includes(".")) {
      return next();
    }

    try {
      const indexPath = path.resolve(import.meta.dirname, "..", "client", "index.html");
      const html = await fs.promises.readFile(indexPath, "utf-8");
      res.set({ "Content-Type": "text/html" });
      res.send(html);
    } catch (err) {
      next(err);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
