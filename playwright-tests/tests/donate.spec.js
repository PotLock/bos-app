/**
 * donate modal
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_PROJECT_ID } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);
  await page.getByRole("button", { name: "Donate" }).click();
});
