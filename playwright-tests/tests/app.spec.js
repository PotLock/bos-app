/**
 * root of the app
 * general sanity tests
 */

import { expect, test } from "@playwright/test";
import { ROOT_SRC, ROUTER_CONFIG } from "../util/constants";

// currently skipping
test.skip("should load the correct pages per route", async ({ page }) => {
  ROUTER_CONFIG.routes.forEach(async (route) => {
    await page.goto(`${ROOT_SRC}?${ROUTER_CONFIG.param}=${route.path}`);

    const pageSelector = `div[data-component="${route.element.src}"]`; // because this gets applied via bos-workspace v1.0.0
    // and we have not updated yet

    await page.waitForSelector(pageSelector, {
      state: "visible",
    });

    // Find all matching elements
    const elements = await page.$$(pageSelector);

    // Assert that at at least one element was found
    expect(elements.length).toBeGreaterThan(0);
  });
});
