import express from "express";
import RecipeModel from "../models/recipe.js";

const router = express.Router();

//get todas las recetas
router.get("/", async (request, response) => {
    const recipes = await RecipeModel.find({});
    response.json(recipes);
});

//receta por ID
router.get("/:id", async (request, response, next) => {
  try {
    const recipe = await RecipeModel.findById(request.params.id);
    if (recipe) {
      response.json(recipe);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception); 
  }
});

//crear nueva receta
router.post("/", async (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.instructions || !body.ingredients || body.ingredients.length === 0) {
        return response.status(400).json({
            error: "Recipe content missing required fields (name, instructions, or ingredients)",
        });
    }
    const recipe = new RecipeModel({
        name: body.name,
        category: body.category || "General",
        area: body.area,
        instructions: body.instructions,
        image: body.image,
        tags: body.tags,
        youtube: body.youtube,
        source: body.source,
        ingredients: body.ingredients,
    });
    try{
        const savedRecipe = await recipe.save();
        response.status(201).json(savedRecipe);
    } catch (exception) {
        next(exception);
    }
});

//eliminar receta
router.delete("/:id", async (request, response, next) => {
    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(request.params.id);
        if (!deletedRecipe) {
            return response.status(404).json({ error: "Recipe not found" });
        }
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

//actualizar receta
router.put("/:id", async (request, response, next) => {
    const { name, category, area, instructions, image, tags, youtube, source, ingredients } = request.body;
    const recipe = {
        name,
        category,
        area,
        instructions,
        image,
        tags,
        youtube,
        source,
        ingredients,
    };
    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        request.params.id,
        recipe,
        { new: true, runValidators: true, context: 'query' }
        );
        if (updatedRecipe) {
            response.json(updatedRecipe);
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});    

export default router;