/**
 * Using Lifecycle Helpers Example
 * 
 * This example shows how to use the lifecycle helpers for more
 * control over browser launch and dashcam recording.
 */

import {
  TestDriver,
  launchChrome,
  retryAsync,
  sleep,
  waitForPage,
} from "testdriverai/vitest";
import { describe, expect, it } from "vitest";

describe("Manual Lifecycle Control", () => {
  it("should use lifecycle helpers directly", async (context) => {
    const testdriver = TestDriver(context, { headless: true });

    // Wait for the SDK to be ready (auto-connects)
    await testdriver.ready();

    // Manually launch Chrome with custom options
    await launchChrome(testdriver, "https://example.com", {
      guest: true,
      maximized: true,
    });

    // Wait for specific text to appear
    await waitForPage(testdriver, "Example Domain");

    // Use retry helper for flaky operations
    const link = await retryAsync(
      () => testdriver.find("More information link"),
      3, // retries
      1000 // delay between retries
    );

    expect(link.found()).toBe(true);
  });

  it("should use sleep for timing", async (context) => {
    const testdriver = TestDriver(context, { headless: true });
    
    await testdriver.provision.chrome({ url: "https://example.com" });

    // Wait for animations or async operations
    await sleep(2000);

    const result = await testdriver.assert("page is fully loaded");
    expect(result).toBeTruthy();
  });
});
