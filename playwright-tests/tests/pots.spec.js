/**
 * ?tab=pots
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_POT_ID } from "../util/constants";

test("clicking pot card should go to pot page", async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pots`);
  const potCard = await page.getByText("NEAR Retroactive Builders");

  await Promise.all([potCard.click(), page.waitForLoadState("load")]);

  const url = page.url();

  expect(url).toContain(`?tab=pot&potId=${DEFAULT_POT_ID}`);
});

test.describe("User is not logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });

  test("deploy button should not be visible", async ({ page }) => {
    await page.goto(`${ROOT_SRC}?tab=pots`);

    // Check if the deploy button is not visible
    const deployButton = await page.$('a:has-text("Deploy Pot")');

    // Assert that the deploy button is not visible
    expect(deployButton).toBeNull();
  });
});

test.describe("Admin is logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/admin-connected.json",
  });

  test("deploy button should go to deploypot page", async ({ page }) => {
    await page.goto(`${ROOT_SRC}?tab=pots`);

    const deployButton = await page.getByRole("link", { name: "Deploy Pot" });

    await Promise.all([deployButton.click(), page.waitForLoadState("load")]);

    expect(page.url()).toContain("?tab=deploypot");
  });
});

test("clicking learn more button should...", async ({ page }) => {
  // TODO:
});

test("should show active pots", async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pots`);

  const activePots = page.locator('[data-testid="active-pot"]');

  await activePots.first().waitFor();

  const count = await activePots.count();
  for (let i = 0; i < count; i++) {
    await expect(activePots.nth(i)).toBeVisible();
  }
});


test("should show completed pots", async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pots`);

  const completedPots = page.locator('[data-testid="inactive-pot"]');

  await completedPots.first().waitFor();

  const count = await completedPots.count();
  for (let i = 0; i < count; i++) {
    await expect(completedPots.nth(i)).toBeVisible();
  }

});

test("should sort pots", async ({ page }) => {
  // TODO:
});

test("should filter pots", async ({ page }) => {
  // TODO:
});
