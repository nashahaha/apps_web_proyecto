import express from "express";
import type { Request, Response, NextFunction } from "express";
import User from "../models/users.js";
import Recipe from "../models/recipe.js";
import { withUser } from "../utils/middleware.js";

const router = express.Router();

// Agregar receta a favoritos
router.post("/favorites/:recipeId", withUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { recipeId } = request.params;
        const userId = request.userId;

        // Verificar que la receta existe
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return response.status(404).json({ error: "Recipe not found" });
        }

        // Agregar a favoritos si no está ya
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        if (user.favoriteRecipes.includes(recipeId as any)) {
            return response.status(400).json({ error: "Recipe already in favorites" });
        }

        user.favoriteRecipes.push(recipeId as any);
        await user.save();

        response.status(200).json({ 
            message: "Recipe added to favorites",
            favoriteRecipes: user.favoriteRecipes 
        });
    } catch (exception) {
        next(exception);
    }
});

// Quitar receta de favoritos
router.delete("/favorites/:recipeId", withUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { recipeId } = request.params;
        const userId = request.userId;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        user.favoriteRecipes = user.favoriteRecipes.filter(
            id => id.toString() !== recipeId
        );
        await user.save();

        response.status(200).json({ 
            message: "Recipe removed from favorites",
            favoriteRecipes: user.favoriteRecipes 
        });
    } catch (exception) {
        next(exception);
    }
});

// Obtener recetas favoritas del usuario
router.get("/favorites", withUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.userId;

        const user = await User.findById(userId).populate('favoriteRecipes');
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        response.status(200).json(user.favoriteRecipes);
    } catch (exception) {
        next(exception);
    }
});

// Obtener recetas creadas por el usuario
router.get("/recipes", withUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.userId;

        const user = await User.findById(userId).populate('myRecipes');
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        response.status(200).json(user.myRecipes);
    } catch (exception) {
        next(exception);
    }
});

export default router;
