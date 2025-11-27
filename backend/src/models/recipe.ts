import mongoose from "mongoose";

export interface Ingredient {
    ingredient: string;
    measure: string;
}

export interface Recipe {
    id: string; 
    name: string;
    category: string;
    area?: string;
    instructions: string;
    image: string;
    tags?: string[];
    youtube?: string;
    source?: string;
    ingredients: Ingredient[];
    author?: mongoose.Types.ObjectId | {
        id: string;
        name: string;
        email: string;
    };
}

const ingredientSchema = new mongoose.Schema<Ingredient>({
    ingredient: { type: String, required: true },
    measure: { type: String, required: true },
});

ingredientSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        const { _id, __v, ...rest } = returnedObject;
        return rest;
    },
});

const recipeSchema = new mongoose.Schema<Recipe>({
    name: { type: String, required: true, minLength: 3 }, //validacion minima
    category: { type: String, required: true },
    area: { type: String },
    instructions: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String] },
    youtube: { type: String },
    source: { type: String },
    ingredients: { type: [ingredientSchema], required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
}, {
    collection: 'nomnom_recipes' 
});

recipeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        const { _id, __v, id, ...rest } = returnedObject;
        return { id: _id.toString(), ...rest };
    },
});

const RecipeModel = mongoose.model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;