/**
 * donate modal
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_PROJECT_ID } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);
});

test.skip("clicking donate button should show donate modal", async ({ page }) => {
  await page.getByRole("button", { name: "Donate" }).click();
});
