import { defineConfig, devices } from "@playwright/test"
import path from "node:path"

const e2eDir = __dirname
const rootDir = path.resolve(e2eDir, "..")

export default defineConfig({
  testDir: path.join(e2eDir, "tests"),
  outputDir: path.join(e2eDir, "test-results"),
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: path.join(e2eDir, "playwright-report"), open: "never" }],
  ],
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    navigationTimeout: 45_000,
    actionTimeout: 15_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "tablet",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
        isMobile: false,
        hasTouch: true,
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
      },
    },
  ],
  webServer: {
    command: "npm run dev -- -H 127.0.0.1 -p 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    cwd: rootDir,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
})
