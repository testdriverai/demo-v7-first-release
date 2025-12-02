/**
 * Step-by-Step Test Example
 * 
 * This example demonstrates the recommended pattern from AGENTS.md:
 * - One action per step
 * - Numbered step names for easy debugging
 * - Each step can be run independently with --testNamePattern
 * 
 * Run individual steps:
 *   vitest --testNamePattern "step01" tests/steps.test.mjs
 *   vitest --testNamePattern "step02" tests/steps.test.mjs
 */

import { createTestDriver, registerTest, cleanupTestDriver } from "testdriverai/vitest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe.sequential("Login Flow - Step by Step", () => {
  let testdriver;

  beforeAll(async () => {
    // Create a single TestDriver instance for all tests in this file
    testdriver = await createTestDriver({ headless: true });
    
    // Provision opens browser and starts dashcam
    await testdriver.provision.chrome({ 
      url: "http://testdriver-sandbox.vercel.app/login" 
    });
  });

  afterAll(async () => {
    // Clean up - stops dashcam and disconnects
    await cleanupTestDriver(testdriver);
  });

  it("step01: verify login page loaded", async (context) => {
    registerTest(testdriver, context);
    
    // Verify we're on the login page
    const result = await testdriver.assert("login form is visible");
    expect(result).toBeTruthy();
  });

  it("step02: click username field", async (context) => {
    registerTest(testdriver, context);
    
    const usernameField = await testdriver.find("Username input field");
    await usernameField.click();
  });

  // it("step03: type username", async (context) => {
  //   registerTest(testdriver, context);
  //   await testdriver.type("standard_user");
  // });

  // it("step04: click password field", async (context) => {
  //   registerTest(testdriver, context);
  //   const passwordField = await testdriver.find("Password input field");
  //   await passwordField.click();
  // });

  // it("step05: type password", async (context) => {
  //   registerTest(testdriver, context);
  //   await testdriver.type("secret_sauce", { secret: true });
  // });

  // it("step06: click sign in button", async (context) => {
  //   registerTest(testdriver, context);
  //   const signInButton = await testdriver.find("Sign in button");
  //   await signInButton.click();
  // });

  // it("step07: verify login success", async (context) => {
  //   registerTest(testdriver, context);
  //   const result = await testdriver.assert("user is logged in and dashboard is visible");
  //   expect(result).toBeTruthy();
  // });
});
