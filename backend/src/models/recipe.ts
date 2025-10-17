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
}

const ingredientSchema = new mongoose.Schema<Ingredient>({
    ingredient: { type: String, required: true },
    measure: { type: String, required: true },
});

ingredientSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete (returnedObject as any)._id;
        delete (returnedObject as any).__v;
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
});

recipeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete (returnedObject as any)._id;
        delete (returnedObject as any).__v;
    },
});

const RecipeModel = mongoose.model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;