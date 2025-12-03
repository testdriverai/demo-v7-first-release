/**
 * Basic TestDriver Vitest Example
 * 
 * This example shows the simplest way to use TestDriver with Vitest.
 * The TestDriver hook automatically manages:
 * - Connection to sandbox
 * - Dashcam recording
 * - Cleanup on test completion
 */

import { describe, expect, it } from "vitest";
// Import TestDriver from the vitest hooks
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Google Search Example", () => {
  it("should search for TestDriver", async (context) => {
    // Create TestDriver instance - automatically connects to sandbox
    const testdriver = TestDriver(context, { headless: true });

    // Provision Chrome browser with a URL
    // This also starts dashcam recording automatically
    await testdriver.provision.chrome({ url: "https://google.com" });

    // Find and interact with elements using natural language
    const searchBox = await testdriver.find("Google search input field");
    await searchBox.click();

    // Type into the focused element
    await testdriver.type("TestDriver AI");

    // Press Enter to search
    await testdriver.pressKeys(["enter"]);

    // Assert something is visible on the page
    const result = await testdriver.assert("search results are displayed");
    expect(result).toBeTruthy();
  });
});
