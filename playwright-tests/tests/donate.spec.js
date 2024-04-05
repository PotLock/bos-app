/**
 * donate modal
 */

import { test, expect } from "@playwright/test";
import { ROOT_SRC, DEFAULT_PROJECT_ID } from "../util/constants";

test("should open donate modal", async ({ page }) => {
  test.setTimeout(120000); // 2 minutes... we want to improve performance

  // go to project page
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);

  // get donate button and click
  await page.getByRole("button", { name: "Donate" }).click();

  // check if modal is visible
  expect(await page.isVisible("text=Donate to project")).toBeTruthy();
});

test("project with no active pot should donate direct with correct amount", async ({ page }) => {
  test.setTimeout(120000); // 2 minutes... we want to improve performance

  // go to project page
  await page.goto(`${ROOT_SRC}?tab=project&projectId=${DEFAULT_PROJECT_ID}`);

  // click donate button and wait for modal to be visible
  await page.getByRole("button", { name: "Donate" }).click();
  expect(await page.isVisible("text=Donate to project")).toBeTruthy();

  // fill in amount and click donate
  await page.fill("input[name=amount]", "100");
  await page.getByRole("button", { name: "Donate" }).nth(1).click();

  // confirmation modal should be visible, grab data
  const transactionObj = JSON.parse(await page.locator("div.modal-body code").innerText());

  // expect donate to project
  expect(transactionObj).toMatchObject({
    // we need a way to extract the transaction details
    bypass_protocol_fee: false,
    message: "",
    recipient_id: DEFAULT_PROJECT_ID,
  });
});
