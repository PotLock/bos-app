import { test, expect } from "@playwright/test";

test("should find bos loader configuration in localstorage", async ({ page }) => {
  await page.goto("/");

  const localStoreFlags = await page.evaluate(() => localStorage.getItem("flags"));
  expect(localStoreFlags).toEqual(
    JSON.stringify({ bosLoaderUrl: "http://127.0.0.1:8080/api/loader" })
  );
});

test("should not get bos loader fetch error", async ({ page }) => {
  await page.goto("/potlock.near/widget/Index?tab=projects");
  const bodyText = await page.textContent("body");
  expect(bodyText).not.toContain('Source code for "potlock.near/widget/Index" is not found');
});
