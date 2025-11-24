import mongoose from "mongoose";
import RecipeModel from "../dist/models/recipe.js";
import config from "../dist/utils/config.js";
import logger from "../dist/utils/logger.js";

const recipes = [
  {
    name: "Chocolate Caramel Crispy",
    category: "Dessert",
    area: "British",
    instructions: "Grease and line a 20 x 20cm baking tin with parchment paper. Remove the wrapper from the Mars bars and chop them into small chunks. Melt the Mars bar pieces and butter together in a heat-proof bowl set over a saucepan of simmering water, making sure the bottom of the bowl does not touch the water. Stir constantly until the Mars bars have melted and the mixture is smooth. Remove from the heat and stir in the Rice Krispies until they are all coated in the melted Mars bar mixture. Press the mixture into the prepared tin and smooth the top with the back of a spoon. Melt the chocolate in a heat-proof bowl set over a saucepan of simmering water. Pour the melted chocolate over the top of the Mars bar mixture and spread it out evenly. Leave to set in the fridge for at least 2 hours before cutting into squares.",
    image: "https://www.themealdb.com/images/media/meals/1550442508.jpg",
    tags: ["Sweet", "Snack", "Treat", "Tart"],
    youtube: "https://www.youtube.com/watch?v=qsk_At_gjv0",
    ingredients: [
      { ingredient: "Mars Bar", measure: "6 chopped" },
      { ingredient: "Butter", measure: "150g" },
      { ingredient: "Rice Krispies", measure: "120g" },
      { ingredient: "Milk Chocolate", measure: "150g" }
    ],
    source: "http://www.donalskehan.com/recipes/chocolate-caramel-rice-crispy-treats/"
  },
  {
    name: "Roasted Eggplant With Tahini",
    category: "Vegetarian",
    area: "American",
    instructions: "For the Lentils: Heat 2 tablespoons olive oil in a medium saucepan over medium heat. Add carrots, celery, and onion and cook until softened. Add garlic and cook until fragrant. Add lentils, bay leaves, stock or water, and a pinch of salt. Bring to a simmer, cover partially, and cook until lentils are tender, about 30 minutes. Stir in vinegar and season with salt and pepper. For the Eggplant: Cut each eggplant in half. Score flesh in a cross-hatch pattern. Transfer to a baking sheet, brush with oil, and season with salt and pepper. Place a rosemary sprig on top of each. Roast at 450°F until completely tender, 25 to 35 minutes. To Serve: Toast pine nuts in olive oil until golden. Stir half of parsley into lentils and transfer to a platter. Arrange eggplant on top. Spread tahini sauce over each eggplant half and sprinkle with pine nuts and remaining parsley.",
    image: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
    tags: ["Vegetarian", "Pulse"],
    youtube: "https://www.youtube.com/watch?v=HkywCtna9t0",
    source: "http://www.seriouseats.com/recipes/2016/03/roasted-eggplant-tahini-pine-nut-lentil-vegan-experience-recipe.html",
    ingredients: [
      { ingredient: "Olive Oil", measure: "2 tablespoons" },
      { ingredient: "Carrots", measure: "2 small" },
      { ingredient: "Celery", measure: "2 stalks" },
      { ingredient: "Onion", measure: "1 medium" },
      { ingredient: "Garlic", measure: "6 cloves" },
      { ingredient: "Brown Lentils", measure: "340g" },
      { ingredient: "Bay Leaves", measure: "2" },
      { ingredient: "Water", measure: "4 cups" },
      { ingredient: "Egg Plants", measure: "2 large" },
      { ingredient: "Pine nuts", measure: "1/4 cup" }
    ]
  },
  {
    name: "Spaghetti Carbonara",
    category: "Pasta",
    area: "Italian",
    instructions: "Cook spaghetti according to package directions. Meanwhile, cook bacon until crispy. Reserve some pasta water. Mix eggs with parmesan cheese. Drain pasta, toss with bacon and egg mixture, adding pasta water to create a creamy sauce. Season with black pepper.",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    tags: ["Pasta", "Italian"],
    youtube: "https://www.youtube.com/watch?v=3AAdKl1UYZs",
    ingredients: [
      { ingredient: "Spaghetti", measure: "400g" },
      { ingredient: "Bacon", measure: "200g" },
      { ingredient: "Eggs", measure: "4" },
      { ingredient: "Parmesan", measure: "100g" },
      { ingredient: "Black Pepper", measure: "To taste" }
    ]
  }
];

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI)
    .then(async () => {
      logger.info("connected to MongoDB");
      
      // Poblar recetas
      for (const recipe of recipes) {
        const newRecipe = new RecipeModel(recipe);
        await newRecipe.save();
        logger.info(`Added recipe: ${recipe.name}`);
      }
      
      logger.info("Database populated successfully!");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
      process.exit(1);
    });
}
