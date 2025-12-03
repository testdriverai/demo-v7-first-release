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
    ├── airbnb.test.mjs    # More complex example
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
