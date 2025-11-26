import mongoose from "mongoose";

export interface IngredientDoc {
    id: string;
    name: string;
    createdAt: Date;
}

const ingredientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    collection: 'nomnom_ingredients'
});

ingredientSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        const obj = returnedObject as { _id?: unknown; __v?: number; id?: string };
        obj.id = (returnedObject._id as { toString: () => string }).toString();
        delete obj._id;
        delete obj.__v;
    },
});

const IngredientModel = mongoose.model("Ingredient", ingredientSchema);

export default IngredientModel;
