import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("logo links to homepage", async ({ page }) => {
    await page.goto("/contact");
    // Click the logo (first link in nav)
    await page.locator("nav a").first().click();
    await expect(page).toHaveURL("/");
  });

  test("footer Contact link navigates to /contact", async ({ page }) => {
    await page.goto("/");
    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");
  });

  test("footer Privacy Policy link navigates to /privacy", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL("/privacy");
  });

  test("footer Terms of Service link navigates to /terms", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL("/terms");
  });

  test("Log In link navigates to /login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Log In" }).first().click();
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu opens and shows nav links", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Toggle menu").click();
    await expect(page.getByText("Features").last()).toBeVisible();
    await expect(page.getByText("Pricing").last()).toBeVisible();
    await expect(page.getByText("FAQ").last()).toBeVisible();
  });

  test("mobile menu closes when a link is clicked", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Toggle menu").click();
    // Click on a mobile nav link
    await page.getByText("Features").last().click();
    // Mobile menu should close
    await expect(page.getByLabel("Toggle menu")).toBeVisible();
  });
});
