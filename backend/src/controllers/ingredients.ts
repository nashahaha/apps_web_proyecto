import express from "express";
import type { Request, Response, NextFunction } from "express";
import IngredientModel from "../models/ingredient.js";

const router = express.Router();

// Obtener todos los ingredientes
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const ingredients = await IngredientModel.find({}).sort({ name: 1 });
        response.json(ingredients);
    } catch (exception) {
        next(exception);
    }
});

// Crear un nuevo ingrediente
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    const { name } = request.body;

    if (!name || name.trim() === "") {
        return response.status(400).json({ error: "Ingredient name is required" });
    }

    try {
        // Verificar si ya existe (case insensitive)
        const existing = await IngredientModel.findOne({ 
            name: name.toLowerCase().trim() 
        });

        if (existing) {
            return response.json(existing); // Retornar el existente
        }

        // Crear nuevo ingrediente
        const newIngredient = new IngredientModel({ 
            name: name.toLowerCase().trim() 
        });
        
        const savedIngredient = await newIngredient.save();
        response.status(201).json(savedIngredient);
    } catch (exception) {
        next(exception);
    }
});

export default router;
