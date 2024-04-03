/**
 * ?tab=pot
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_POT_ID } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pot&potId=${DEFAULT_POT_ID}`);
});

test("clicking pot card should go to pot page", async ({ page }) => {
  await page.getByText("NEAR Retroactive Builders").click();

  const url = page.url();

  expect(url).toContain("?tab=pot&potId=build.v1.potfactory.potlock.near");
});
