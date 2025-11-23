import { Page, APIRequestContext, expect } from "@playwright/test";

export async function login(page: Page) {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123456");

    await page.getByRole("button", { name: /login/i }).click();
    await expect(page.getByRole("heading", { name: /ñom ñom/i })).toBeVisible();
}

export async function registerDefaultUser(request: APIRequestContext) {
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
