import { test, expect } from "@playwright/test";
async function login(page) {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123456");

    await page.getByRole("button", { name: /login/i }).click();
    await expect(page.getByRole("heading", { name: /ñom ñom/i })).toBeVisible();
}

async function registerDefaultUser(request) {
    // resetea DB
    await request.post("http://localhost:3001/api/testing/reset");

    // crea usuario
    await request.post("http://localhost:3001/api/auth/register", {
        data: {
            name: "Test User",
            email: "test@example.com",
            password: "123456",
        },
    });
}

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
