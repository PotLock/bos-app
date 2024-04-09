/**
 * ?tab=pot
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_POT_ID } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`${ROOT_SRC}?tab=pot&potId=${DEFAULT_POT_ID}&nav=projects`);
});

test("clicking project card should go to project page", async ({ page }) => {
  test.setTimeout(120000); // 1 minute... we want to improve performance

  const projectSearchBar = await page.getByPlaceholder("Search projects");

  await projectSearchBar.fill("magic");

  const projectCard = page.getByText("MagicBuild");

  await Promise.all([projectCard.click(), page.waitForLoadState("load")]);

  const projectUrl = page.url();

  expect(projectUrl).toContain("?tab=project&projectId=magicbuild");
});
