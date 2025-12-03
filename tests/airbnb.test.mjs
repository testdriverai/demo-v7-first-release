/**
 * Airbnb Search TestDriver Example
 * 
 * This test navigates to Airbnb and searches for accommodations
 * in Austin, TX for 3 guests from December 8 to January 2.
 */

import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Airbnb Search", () => {
  it("should search for places in Austin TX for 3 people from Dec 8 to Jan 2", async (context) => {
    // Create TestDriver instance
    const testdriver = TestDriver(context, { headless: false });

    // Navigate to Airbnb
    await testdriver.provision.chrome({ url: "https://airbnb.com" });

    // Find and click the location search field
    const locationField = await testdriver.find("where search box or location input");
    await locationField.click();
    await testdriver.type("Austin, TX");

    // Wait a moment for autocomplete suggestions and select Austin
    const austinOption = await testdriver.find("Austin, Texas in the dropdown");
    await austinOption.click();

    // Select check-in date: December 8
    const checkinDate = await testdriver.find("December 8 in the calendar");
    await checkinDate.click();

    // Select checkout date: January 2
    const checkoutDate = await testdriver.find("January 2 in the calendar");
    await checkoutDate.click();

    // Click on guests selector
    const guestsButton = await testdriver.find("who or guests button");
    await guestsButton.click();

    // Add guests to make it 3 adults total
    const addAdultButton = await testdriver.find("increase or plus button for adults");
    await addAdultButton.click();
    await addAdultButton.click();

    // Click search button
    const searchButton = await testdriver.find("search button");
    await searchButton.click();

    // Verify we can see stays/listings on the page
    const listing = await testdriver.find("first property listing or stay card");
    expect(listing).toBeTruthy();
  });
});
