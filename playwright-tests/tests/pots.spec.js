/**
 * ?tab=pots
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test("show load the pots page", async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pots`);

  // const pageSelector = 'div[data-component="potlock.near/widget/Pots.Home"]';
  const pageSelector = "div:has-text('Explore Pots')";

  await page.waitForSelector(pageSelector, {
    state: "visible",
  });

  // Find all matching elements
  const elements = await page.$$(pageSelector);

  // Assert that at at least one element was found
  expect(elements.length).toBeGreaterThan(0);
});
