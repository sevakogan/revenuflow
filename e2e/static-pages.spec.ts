import { test, expect } from "@playwright/test";

test.describe("Static Pages", () => {
  test("/terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1")).toContainText(/Terms/);
  });

  test("/privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText(/Privacy/);
  });

  test("/book page loads", async ({ page }) => {
    await page.goto("/book");
    await expect(page.getByText(/Book Your/)).toBeVisible();
  });

  test("/contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Get In Touch")).toBeVisible();
  });

  test("/login page loads", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Welcome Back")).toBeVisible();
  });
});
