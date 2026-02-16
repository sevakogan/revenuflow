import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders contact form with heading", async ({ page }) => {
    await expect(page.getByText("Tell Us About Your Properties")).toBeVisible();
  });

  test("renders all required fields", async ({ page }) => {
    await expect(page.getByLabel(/^Name/)).toBeVisible();
    await expect(page.getByLabel(/Phone/)).toBeVisible();
    await expect(page.getByLabel(/Email/)).toBeVisible();
    await expect(page.getByLabel(/Message/)).toBeVisible();
  });

  test("successful submission shows success banner", async ({ page }) => {
    // Mock the API endpoint
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, id: 1 }),
      });
    });

    await page.getByLabel(/^Name/).fill("Test User");
    await page.getByLabel(/Phone/).fill("555-123-4567");
    await page.getByLabel(/Email/).fill("test@example.com");
    await page.getByLabel(/Message/).fill("Test message for contact form");
    await page.getByRole("button", { name: "Get My Free Revenue Analysis" }).click();

    await expect(page.getByText(/We got your message/)).toBeVisible({ timeout: 5000 });
  });

  test("shows error on failed submission", async ({ page }) => {
    // Mock the API to return error
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: false, message: "Server error" }),
      });
    });

    await page.getByLabel(/^Name/).fill("Test User");
    await page.getByLabel(/Phone/).fill("555-123-4567");
    await page.getByLabel(/Email/).fill("test@example.com");
    await page.getByLabel(/Message/).fill("Test message");
    await page.getByRole("button", { name: "Get My Free Revenue Analysis" }).click();

    await expect(page.getByText("Server error")).toBeVisible({ timeout: 5000 });
  });
});
