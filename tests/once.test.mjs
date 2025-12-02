/**
 * Using it.once() for Setup Steps
 * 
 * This example shows how to use it.once() for steps that should
 * only run once per sandbox session (skipped on reconnect).
 * 
 * This is useful when:
 * - Debugging later steps (sandbox stays connected)
 * - App launch/provisioning that persists
 */

import { describe, expect, it, TestDriver } from "testdriverai/vitest";

describe.sequential("Sandbox Reconnection Example", () => {
  // This step only runs once per sandbox session
  // If you run the test again while sandbox is still connected,
  // this step will be skipped
  it.once("step01: launch application", async (context) => {
    const testdriver = TestDriver(context, { headless: true });
    
    await testdriver.provision.chrome({ 
      url: "https://example.com" 
    });

    console.log("Application launched - this only runs once per sandbox");
  });

  // This step always runs
  it("step02: verify page content", async (context) => {
    const testdriver = TestDriver(context, { headless: true });

    const result = await testdriver.assert("Example Domain heading is visible");
    expect(result).toBeTruthy();
  });

  // This step always runs
  it("step03: check for link", async (context) => {
    const testdriver = TestDriver(context, { headless: true });

    const link = await testdriver.find("More information link");
    expect(link.found()).toBe(true);
  });
});
