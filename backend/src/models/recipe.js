import mongoose from "mongoose";
const ingredientSchema = new mongoose.Schema({
    ingredient: { type: String, required: true },
    measure: { type: String, required: true },
});
ingredientSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        const { _id, __v, ...rest } = returnedObject;
        return rest;
    },
});
const recipeSchema = new mongoose.Schema({
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
});
recipeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        const { _id, __v, id, ...rest } = returnedObject;
        return { id: _id.toString(), ...rest };
    },
});
const RecipeModel = mongoose.model("Recipe", recipeSchema);
export default RecipeModel;
//# sourceMappingURL=recipe.js.map