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
    author?: mongoose.Types.ObjectId;
}
declare const RecipeModel: mongoose.Model<Recipe, {}, {}, {}, mongoose.Document<unknown, {}, Recipe, {}, {}> & Recipe & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default RecipeModel;
//# sourceMappingURL=recipe.d.ts.map