import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import testDriverPlugin from "testdriverai/vitest/plugin";

export default defineConfig(({ mode }) => {
  // Load .env files - this will populate process.env with TD_API_KEY
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      testDriverPlugin({
        apiKey: env.TD_API_KEY,
        apiRoot: env.TD_API_ROOT || "https://testdriver-api.onrender.com",
      }),
    ],
    test: {
      // Test file patterns
      include: ["**/*.test.{js,mjs}"],

      // Timeout settings for TestDriver tests (they run on remote sandboxes)
      testTimeout: 300000, // 5 minutes per test
      hookTimeout: 300000, // 5 minutes for setup/teardown

      // Reporter configuration
      reporters: [
        ['default', { summary: false }],
        [
          "testdriverai/vitest/plugin",
          {
            apiKey: env.TD_API_KEY,
            apiRoot: env.TD_API_ROOT || "https://testdriver-api.onrender.com",
          },
        ],
      ],

      // Setup file to initialize plugin in worker processes
      setupFiles: ["testdriverai/vitest/setup"],

      // Pass environment variables to tests
      env: {
        TD_API_KEY: env.TD_API_KEY,
        TD_API_ROOT: env.TD_API_ROOT,
      },
    },
  };
});
