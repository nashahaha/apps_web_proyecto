import { test, expect } from "@playwright/test";
import { login, registerDefaultUser } from "../helpers/auth";

test.describe("Authentication", () => {
    test.beforeEach(async ({ request }) => {
        await registerDefaultUser(request);
    });

    test("user can log in", async ({ page }) => {
        await login(page);
        await expect(page.getByText("Test User")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
        await page.goto("/login");
        await page.getByLabel("Email").fill("test@example.com");
        await page.getByLabel("Password").fill("wrongpass");

        await page.getByRole("button", { name: /login/i }).click();

        await expect(page.getByText(/invalid/i)).toBeVisible();
    });
});
