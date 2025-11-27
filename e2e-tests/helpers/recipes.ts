// helpers/recipes.ts
import { Page, APIRequestContext } from "@playwright/test";
import { registerDefaultUser } from "./auth";

export async function resetAndLogin(page: Page, request: APIRequestContext) {
    await request.post("http://localhost:3001/api/testing/reset");
    await registerDefaultUser(request);

    await page.goto("/login");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123456");
    await page.getByRole("button", { name: /login/i }).click();
    await page.waitForURL("/");
}
export async function createRecipe(page: Page) {
    const name = `Recipe ${Date.now()}`;
    await page.goto("/newRecipe");
    await page.waitForLoadState("networkidle");
    await page.setInputFiles('input[type="file"]', './fixtures/tallarines.png');
    await page.locator('input[placeholder^="Roasted Eggplant"]').fill(name);
    await page.locator('input[type="number"]').first().fill("2");
    await page.getByPlaceholder("Search ingredient...").fill("Tomato");
    await page
        .getByPlaceholder("Enter your recipe intructions...")
        .fill("Mix everything and cook.");

    // Publicar receta
    await Promise.all([
        page.waitForURL("/"),
        page.getByRole("button", { name: /publish recipe/i }).click(),
    ]);

    // Entrar a la receta para obtener su ID
    await page.getByText(name).first().click();
    await page.waitForURL("/recipe/*");

    const id = page.url().split("/").pop();
    return { id, name };
}