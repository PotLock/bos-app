/**
 * donate modal
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_PROJECT_ID } from "../util/constants";

test("should open donate modal", async ({ page }) => {
  test.setTimeout(120000); // 2 minutes... we want to improve performance
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);
  await page.getByRole("button", { name: "Donate" }).click();
  expect(await page.isVisible("text=Donate to project")).toBeTruthy();
});

test("project with no active pot should donate direct with correct amount", async ({ page }) => {
  test.setTimeout(120000); // 2 minutes... we want to improve performance
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);
  await page.getByRole("button", { name: "Donate" }).click();
  expect(await page.isVisible("text=Donate to project")).toBeTruthy();
  await page.fill("input[name=amount]", "100");
  await page.getByRole("button", { name: "Donate" }).nth(1).click();

  // Confirmation modal should be visible
  const transactionObj = JSON.parse(await page.locator("div.modal-body code").innerText());
  expect(transactionObj).toMatchObject({
    bypass_protocol_fee: false,
    message: "",
    recipient_id: DEFAULT_PROJECT_ID,
  });
});
