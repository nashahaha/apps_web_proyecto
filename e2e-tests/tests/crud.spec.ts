import { test, expect, Page, APIRequestContext } from "@playwright/test";
import { registerDefaultUser } from "../helpers/auth";

// Función para limpiar la base de datos
async function clearDatabase(request: APIRequestContext) {
    await request.post("http://localhost:3001/api/testing/reset");
}

// Función para hacer login del usuario
async function loginUser(page: Page) {
    await page.goto("/login");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("123456");
    await page.getByRole("button", { name: /login/i }).click();
    await page.waitForURL("/", { timeout: 10000 });
}

// Función para crear una receta
async function createTestRecipe(page: Page) {
    await page.goto("/newRecipe");
    await page.waitForLoadState('networkidle');
    
    // Subir imagen
    await page.setInputFiles('input[type="file"]', './fixtures/tallarines.png');
    
    // Llenar nombre de la receta
    await page.locator('input[placeholder^="Roasted Eggplant"]').fill("My Test Recipe");
    
    // Llenar el primer ingrediente (cantidad)
    await page.locator('input[type="number"]').first().fill("2");
    
    // Llenar nombre del ingrediente
    await page.getByPlaceholder("Search ingredient...").fill("Tomato");
    
    // Llenar instrucciones
    await page.getByPlaceholder("Enter your recipe intructions...")
        .fill("Mix everything and cook.");
    
    // Publicar receta
    await page.getByRole("button", { name: /publish recipe/i }).click();
    await page.waitForURL("/", { timeout: 10000 });
}

test.describe("Recipe CRUD operations", () => {
    test("user can create recipe and add it to favorites", async ({ page, request }) => {
        //Limpiar base de datos para partir de cero
        await clearDatabase(request);
        
        //Registrar usuario
        await registerDefaultUser(request);
        
        //Login del usuario
        await loginUser(page);
        
        //Crear receta
        await createTestRecipe(page);
        
        //Verificar que la receta fue creada
        await expect(page.getByText("My Test Recipe")).toBeVisible();
        
        //Añadir receta a favoritos
        await page.getByPlaceholder("Search by ingredient...").fill("My Test Recipe");
        await expect(page.getByText("My Test Recipe").first()).toBeVisible();
        
        const favButton = page.getByRole('button', { name: 'Agregar a favoritos' }).first();
        await favButton.click();
        
        //Verificar que la receta está en favoritos
        await page.goto("/profile");
        await expect(page.getByText("My Test Recipe").first()).toBeVisible();
    });
});
