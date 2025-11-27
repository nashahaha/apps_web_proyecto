import { test, expect } from "@playwright/test";
import { resetAndLogin, createRecipe } from "../helpers/recipes";


test.beforeEach(async ({ page, request }) => {
    await resetAndLogin(page, request);
});

test("user can create recipe and add it to favorites", async ({ page }) => {
    const { id, name } = await createRecipe(page);

    // Verificar que existe
    await expect(page.getByText(name)).toBeVisible();

    // Verificar en favoritos
    await page.goto("/profile");
    await expect(page.getByText(name)).toBeVisible();
});

test("user can edit recipe", async ({ page }) => {
    const { id, name } = await createRecipe(page);

    await page.goto(`/recipe/${id}`);

    await page.getByRole("link", { name: /Edit/i }).click();

    await page.locator('input[placeholder="Recipe name"]').fill("Pasta with Tomato Sauce");
    await page.getByRole("button", { name: /save changes/i }).click();

    await expect(page.getByText("Pasta with Tomato Sauce")).toBeVisible();
});

test("user can delete recipe", async ({ page }) => {
    const { id, name } = await createRecipe(page);

    await page.goto(`/recipe/${id}`);

    await page.getByRole("button", { name: /^Delete$/i }).click();
    await page.waitForSelector(".modal-open .modal-box");

    const confirm = page.locator(".modal-box").getByRole("button", { name: /^Delete$/i });

    await Promise.all([
        page.waitForURL("/profile"),
        confirm.click(),
    ]);

    await expect(page.getByText(name)).not.toBeVisible();
});