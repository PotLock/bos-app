/**
 * ?tab=pots
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_POT_ID } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pots`);
});

test("clicking pot card should go to pot page", async ({ page }) => {
  const potCard = await page.getByText("NEAR Retroactive Builders");

  await Promise.all([potCard.click(), page.waitForLoadState("load")]);

  const url = page.url();

  expect(url).toContain(`?tab=pot&potId=${DEFAULT_POT_ID}`);
});

test("clicking deploy button should go to deploypot page", async ({ page }) => {
  // TODO:
});

test("clicking learn more button should...", async ({ page }) => {
  // TODO:
});

test("should show active pots", async ({ page }) => {
  // TODO:
});

test("should show completed pots", async ({ page }) => {
  // TODO:
});

test("should sort pots", async ({ page }) => {
  // TODO:
});

test("should filter pots", async ({ page }) => {
  // TODO:
});
