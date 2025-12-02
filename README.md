# TestDriver Vitest Plugin Example

This example project demonstrates how to use the TestDriver Vitest plugin in your own projects.

## Setup

```bash
# Install dependencies
npm install

# Set your API key
export TD_API_KEY=your_api_key_here

# Run tests
npm test
```

## Project Structure

```
examples/vitest-plugin/
├── package.json          # Project config with testdriverai dependency
├── vitest.config.mjs     # Vitest configuration
├── README.md             # This file
└── tests/
    ├── basic.test.mjs    # Simple example
    ├── steps.test.mjs    # Step-by-step pattern (recommended)
    ├── lifecycle.test.mjs # Using lifecycle helpers
    └── once.test.mjs     # Using it.once() for setup
```

## Examples

### Basic Usage

```javascript
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest";

describe("My Test", () => {
  it("should work", async (context) => {
    const testdriver = TestDriver(context, { headless: true });
    
    await testdriver.provision.chrome({ url: "https://example.com" });
    
    const result = await testdriver.assert("page loaded");
    expect(result).toBeTruthy();
  });
});
```

### Step-by-Step Pattern (Recommended)

```javascript
describe("Login Flow", () => {
  it("step01: provision browser", async (context) => {
    const testdriver = TestDriver(context);
    await testdriver.provision.chrome({ url: "https://myapp.com/login" });
  });

  it("step02: enter username", async (context) => {
    const testdriver = TestDriver(context);
    const field = await testdriver.find("Username field");
    await field.click();
    await testdriver.type("myuser");
  });

  it("step03: enter password", async (context) => {
    const testdriver = TestDriver(context);
    const field = await testdriver.find("Password field");
    await field.click();
    await testdriver.type("mypassword", { secret: true });
  });

  it("step04: submit", async (context) => {
    const testdriver = TestDriver(context);
    const button = await testdriver.find("Login button");
    await button.click();
    await testdriver.assert("logged in successfully");
  });
});
```

### Running Individual Steps

```bash
# Run just step 2 (sandbox persists from previous run)
vitest --testNamePattern "step02" tests/steps.test.mjs
```

## Available Imports

```javascript
// Core
import { TestDriver } from "testdriverai/vitest";

// Extended Vitest functions
import { describe, it, test, expect, beforeAll, afterAll } from "testdriverai/vitest";

// Lifecycle helpers
import { 
  launchChrome,
  launchChromeForTesting,
  launchChromeExtension,
  waitForPage,
  authDashcam,
  startDashcam,
  stopDashcam,
  runPrerun,
  runPostrun,
} from "testdriverai/vitest";

// Utility functions
import { 
  retryAsync,
  setupEventLogging,
  waitFor,
  sleep,
  generateTestId,
} from "testdriverai/vitest";

// Check reconnection state
import { isReconnected, getTestDriver } from "testdriverai/vitest";
```

## Environment Variables

- `TD_API_KEY` - Your TestDriver API key (required)
- `TD_API_ROOT` - API endpoint (optional, defaults to production)
- `TD_LOG_LEVEL` - Log level: debug, info, warn, error (optional)
