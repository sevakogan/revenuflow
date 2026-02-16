import { test, expect } from "@playwright/test";

test.describe("CTA Lead Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to CTA section
    await page.locator("#cta").scrollIntoViewIfNeeded();
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.getByRole("button", { name: "Get My Free Analysis" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("shows invalid email error", async ({ page }) => {
    await page.getByPlaceholder("John Smith").fill("Test User");
    await page.getByPlaceholder("john@example.com").fill("not-an-email");
    await page.getByRole("button", { name: "Get My Free Analysis" }).click();
    await expect(page.getByText("Please enter a valid email")).toBeVisible();
  });

  test("shows property type error", async ({ page }) => {
    await page.getByPlaceholder("John Smith").fill("Test User");
    await page.getByPlaceholder("john@example.com").fill("test@test.com");
    await page.getByRole("button", { name: "Get My Free Analysis" }).click();
    await expect(page.getByText("Please select a property type")).toBeVisible();
  });

  test("successful form submission shows thank you", async ({ page }) => {
    // Mock the API endpoint
    await page.route("/api/lead", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, id: 1 }),
      });
    });

    await page.getByPlaceholder("John Smith").fill("Test User");
    await page.getByPlaceholder("john@example.com").fill("test@test.com");
    // Select property type (first select)
    await page.locator("select").nth(0).selectOption("vacation-rental");
    // Select property count (second select)
    await page.locator("select").nth(1).selectOption("1-5");
    await page.getByRole("button", { name: "Get My Free Analysis" }).click();

    await expect(page.getByText("Thank You!")).toBeVisible({ timeout: 5000 });
  });
});
