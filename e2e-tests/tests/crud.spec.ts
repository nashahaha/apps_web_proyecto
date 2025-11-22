import { test, expect } from "@playwright/test";
import { registerDefaultUser } from "../helpers/auth";

test("logged user can create recipe", async ({ page, request }) => {
    await registerDefaultUser(request);

    // login
    await page.goto("/login");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123456");
    await page.getByRole("button", { name: /login/i }).click();

    await page.waitForURL("/");

    await page.goto("/newRecipe");

    await page.setInputFiles('input[type="file"]', {
        name: "dummy.jpg",
        mimeType: "image/jpeg",
        buffer: Buffer.from([0xff, 0xd8, 0xff]),
    });

    await page.locator('input[placeholder^="Roasted Eggplant"]').fill("My Test Recipe");

    await page.getByRole("button", { name: "+" }).first().click();
    await page.getByPlaceholder("Search ingredient...").fill("Tomato");

    await page.getByPlaceholder("Enter your recipe intructions...")
        .fill("Mix everything and cook.");

    await page.getByRole("button", { name: /publish recipe/i }).click();

    await page.waitForURL("/", { timeout: 10000 });

    await page.getByPlaceholder("Buscar...").fill("My Test Recipe");

    await expect(page.getByText("My Test Recipe")).toBeVisible();
});
