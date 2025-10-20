import RecipeModel from "../src/models/recipe.js";

const initialRecipes = [
    {
        name: "Chocolate Caramel Crispy",
        category: "Dessert",
        area: "British",
        instructions: "Grease and line a 20 x 20cm baking tin...",
        image: "https://www.themealdb.com/images/media/meals/1550442508.jpg",
        ingredients: [
            { ingredient: "Mars Bar", measure: "6 chopped" },
            { ingredient: "Butter", measure: "150g" },
        ],
    },
    {
        name: "Roasted Eggplant With Tahini",
        category: "Vegetarian",
        area: "American",
        instructions: "For the Lentils: Adjust oven rack to center position...",
        image: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
        ingredients: [
            { ingredient: "Olive Oil", measure: "2 tablespoons" },
            { ingredient: "Carrots", measure: "2 small" },
        ],
    },
];

const recipesInDb = async () => {
    const recipes = await RecipeModel.find({});
    return recipes.map((recipe: any) => recipe.toJSON());
};

export default { initialRecipes, recipesInDb };