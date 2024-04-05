/**
 * ?tab=donors
 */

import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=donors`);
});

test("should show when donors not found", async ({ page }) => {
  await page.waitForSelector("text=Donors Leaderboard");
  // should show No Donors Found on load -- or a nicer loading message?
  expect(await page.isVisible("text=No Donations")).toBeTruthy();
});

test("should load and show donors", async ({ page }) => {
  // Set timeout to a shorter duration
  test.setTimeout(60000); // 1 minute

  // Wait for the element with id "1" to be visible
  await page.waitForSelector("#1", { visible: true });

  // Check if the element containing text "#4" is visible
  const isTextVisible = await page
    .waitForSelector("text=#4", { visible: true, timeout: 10000 })
    .then(() => true)
    .catch(() => false);

  // Assert that the text is visible
  expect(isTextVisible).toBeTruthy();
});
