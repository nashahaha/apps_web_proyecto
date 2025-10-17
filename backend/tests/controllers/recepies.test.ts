import { test, describe, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app.js"; 
import RecipeModel from "../../src/models/recipe.js";
import helper from "../test_helper.js";const api = supertest(app);

beforeEach(async () => {
    await RecipeModel.deleteMany({});
    await RecipeModel.insertMany(helper.initialRecipes); 
});

describe("when there are initially some recipes saved", () => {
    test("recipes are returned as json and correct status code (200)", async () => {
        await api
        .get("/api/recipes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
    //verificar cantidad de recetas
    test("all recipes are returned", async () => {
        const response = await api.get("/api/recipes");
        assert.strictEqual(response.body.length, helper.initialRecipes.length);
    });
});
// ----------------------------------------------------
describe("viewing a specific recipe", () => {
    //receta con id valido
    test("succeeds with a valid id", async () => {
        const recipesAtStart = await helper.recipesInDb();
        const recipeToView = recipesAtStart[0];
        const resultRecipe = await api
        .get(`/api/recipes/${recipeToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
        assert.deepStrictEqual(resultRecipe.body, recipeToView); 
    });
    //falla si la receta no existe
    test("fails with statuscode 404 if recipe does not exist", async () => {
        const nonExistentId = "60c878b66e319c00155b4a53"; // ID ficticio válido pero no en BD
        await api.get(`/api/recipes/${nonExistentId}`).expect(404);
    });
    test("fails with statuscode 400 if id is invalid", async () => {
        const invalidId = "invalid-id-format"; //id mal formado
        await api.get(`/api/recipes/${invalidId}`).expect(400); 
    });
});
// ----------------------------------------------------
describe("addition of a new recipe (POST)", () => {
    test("succeeds with valid data and status code 201", async () => {
        const newRecipe = {
            name: "Test Recipe Post",
            category: "Test",
            instructions: "Test Instructions",
            image: "http://test.com/image.jpg",
            ingredients: [
                { ingredient: "Water", measure: "1 cup" }
            ],
        };
        await api
        .post("/api/recipes")
        .send(newRecipe)
        .expect(201) 
        .expect("Content-Type", /application\/json/);
        // Verifica que el total de recetas haya aumentado
        const recipesAtEnd = await helper.recipesInDb();
        assert.strictEqual(recipesAtEnd.length, helper.initialRecipes.length + 1);
        // Verifica que la nueva receta se haya añadido
        const names = recipesAtEnd.map((r) => r.name);
        assert(names.includes("Test Recipe Post"));
    });

    // falla si falta el nombre (algun dato clave)
    test("fails with status code 400 if required data invalid", async () => {
        const incompleteRecipe = {
            category: "Missing Name",
            instructions: "This should fail",
            ingredients: [{ ingredient: "Water", measure: "1 cup" }]
        };
        await api.post("/api/recipes").send(incompleteRecipe).expect(400);
        // Verifica que no se haya añadido ninguna receta
        const recipesAtEnd = await helper.recipesInDb();
        assert.strictEqual(recipesAtEnd.length, helper.initialRecipes.length);
    });
});

// ----------------------------------------------------

describe("deletion of a recipe (DELETE)", () => {
    test("succeeds with status code 204 if id is valid", async () => {
    const recipesAtStart = await helper.recipesInDb();
    const recipeToDelete = recipesAtStart[0];
    await api.delete(`/api/recipes/${recipeToDelete.id}`).expect(204); 
    // Verifica que el total de recetas haya disminuido
    const recipesAtEnd = await helper.recipesInDb();
    assert.strictEqual(recipesAtEnd.length, helper.initialRecipes.length - 1);
    // Verifica que la receta eliminada ya no exista
    const names = recipesAtEnd.map((n) => n.name);
    assert(!names.includes(recipeToDelete.name));
    });
});

// ----------------------------------------------------
describe("updating an existing recipe (PUT)", () => {
    test("succeeds with status code 200 when updating a recipe", async () => {
        const recipesAtStart = await helper.recipesInDb();
        const recipeToUpdate = recipesAtStart[0];
        const updatedRecipeData = {
        ...recipeToUpdate, 
        name: "Chocolate Caramel Crispy (UPDATED NAME)",
        category: "Snack"
        };
        await api
        .put(`/api/recipes/${recipeToUpdate.id}`)
        .send(updatedRecipeData)
        .expect(200) 
        .expect("Content-Type", /application\/json/);
        const recipesAtEnd = await helper.recipesInDb();
        const updatedRecipe = recipesAtEnd.find(r => r.id === recipeToUpdate.id);
        assert.strictEqual(recipesAtEnd.length, helper.initialRecipes.length); 
        assert.strictEqual(updatedRecipe.name, "Chocolate Caramel Crispy (UPDATED NAME)");
        assert.strictEqual(updatedRecipe.category, "Snack");
    });

    test("fails with statuscode 400 if id is invalid during update", async () => {
        const invalidId = "bad-id-update"; 
        const recipeData = helper.initialRecipes[0]; 
        await api
        .put(`/api/recipes/${invalidId}`)
        .send(recipeData)
        .expect(400); 
    });

    test("fails with statuscode 404 if recipe does not exist", async () => {
        const nonExistentId = "60c878b66e319c00155b4a53";
        const recipeData = helper.initialRecipes[0]; 
        await api
        .put(`/api/recipes/${nonExistentId}`)
        .send(recipeData)
        .expect(404); 
    });
});

after(async () => {
    await mongoose.connection.close();
});