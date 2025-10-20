import express from "express";
import RecipeModel from "../models/recipe.js";
import User from "../models/users.js";
import { withUser } from "../utils/middleware.js";
import type { Request, Response, NextFunction } from "express";
import multer from 'multer';

const upload = multer();
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

//crear nueva receta (requiere autenticación)
router.post("/", withUser, upload.single('image'), async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    const userId = request.userId;
    const imageFile = request.file;
    const ingredients = JSON.parse(body.ingredients);

    if (!body.name || !body.instructions || !ingredients || body.ingredients.length === 0) {
        console.log(body.name)
        console.log(body.instructions)
        console.log(ingredients)
        return response.status(400).json({
            error: "Recipe content missing required fields (name, instructions, or ingredients)",
        });
    }

    const recipe = new RecipeModel({
        name: body.name,
        category: body.category || "General",
        area: body.area,
        instructions: body.instructions,
        image: imageFile ? imageFile.buffer : undefined,
        tags: body.tags,
        youtube: body.youtube,
        source: body.source,
        ingredients: ingredients,
        author: userId,
    });

    try {
        const savedRecipe = await recipe.save();

        // Agregar la receta a myRecipes del usuario
        const user = await User.findById(userId);
        if (user) {
            user.myRecipes.push(savedRecipe._id as any);
            await user.save();
        }

        response.status(201).json(savedRecipe);
    } catch (exception) {
        next(exception);
    }
});

//eliminar receta (solo el autor puede eliminar)
router.delete("/:id", withUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.userId;
        const recipe = await RecipeModel.findById(request.params.id);

        if (!recipe) {
            return response.status(404).json({ error: "Recipe not found" });
        }

        // Verificar que el usuario es el autor
        if (recipe.author && recipe.author.toString() !== userId) {
            return response.status(403).json({ error: "You can only delete your own recipes" });
        }

        await RecipeModel.findByIdAndDelete(request.params.id);

        // Remover de myRecipes del usuario
        const user = await User.findById(userId);
        if (user) {
            user.myRecipes = user.myRecipes.filter(
                id => id.toString() !== request.params.id
            );
            await user.save();
        }

        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

//actualizar receta (solo el autor puede actualizar)
router.put("/:id", withUser, async (request: Request, response: Response, next: NextFunction) => {
    const { name, category, area, instructions, image, tags, youtube, source, ingredients } = request.body;
    const userId = request.userId;

    try {
        const recipe = await RecipeModel.findById(request.params.id);

        if (!recipe) {
            return response.status(404).json({ error: "Recipe not found" });
        }

        // Verificar que el usuario es el autor
        if (recipe.author && recipe.author.toString() !== userId) {
            return response.status(403).json({ error: "You can only update your own recipes" });
        }

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            request.params.id,
            { name, category, area, instructions, image, tags, youtube, source, ingredients },
            { new: true, runValidators: true, context: 'query' }
        );

        response.json(updatedRecipe);
    } catch (exception) {
        next(exception);
    }
});

export default router;