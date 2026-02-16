import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero section with heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Stop Undercharging");
  });

  test("renders all major sections with IDs", async ({ page }) => {
    await expect(page.locator("#hero")).toBeAttached();
    await expect(page.locator("#features")).toBeAttached();
    await expect(page.locator("#how-it-works")).toBeAttached();
    await expect(page.locator("#results")).toBeAttached();
    await expect(page.locator("#pricing")).toBeAttached();
    await expect(page.locator("#faq")).toBeAttached();
    await expect(page.locator("#cta")).toBeAttached();
  });

  test('"Get a Free Analysis" hero button scrolls to CTA', async ({ page }) => {
    await page.getByRole("button", { name: "Get a Free Analysis" }).click();
    // Wait for scroll animation
    await page.waitForTimeout(500);
    await expect(page.locator("#cta")).toBeInViewport();
  });

  test("nav link scrolls to features section", async ({ page }) => {
    await page.getByRole("link", { name: "Features" }).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator("#features")).toBeInViewport();
  });

  test("renders footer with contact info", async ({ page }) => {
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.getByText("(866) 996-6382")).toBeVisible();
    await expect(page.getByText("support@revenuflow.com")).toBeVisible();
  });
});
