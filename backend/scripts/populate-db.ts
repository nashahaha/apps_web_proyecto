import mongoose from "mongoose";
import RecipeModel from "../src/models/recipe.js";
import config from "../src/utils/config.js";
import logger from "../src/utils/logger.js";

const recipes = [
  {
    name: "Chocolate Caramel Crispy",
    category: "Dessert",
    area: "British",
    instructions: "Grease and line a 20 x 20cm baking tin with parchment paper...",
    image: "https://www.themealdb.com/images/media/meals/1550442508.jpg",
    tags: ["Sweet", "Snack", "Treat", "Tart", "Alcoholic", "BBQ"],
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
    name: "Roasted Eggplant With Tahini, Pine Nuts, and Lentils",
    category: "Vegetarian",
    area: "American",
    instructions: "For the Lentils: Adjust oven rack to center position and preheat oven to 450°F to prepare for roasting eggplant. Meanwhile, heat 2 tablespoons olive oil in a medium saucepan over medium heat until shimmering. Add carrots, celery, and onion and cook, stirring, until softened but not browned, about 4 minutes. Add garlic and cook, stirring, until fragrant, about 30 seconds. Add lentils, bay leaves, stock or water, and a pinch of salt. Bring to a simmer, cover with the lid partially ajar, and cook until lentils are tender, about 30 minutes. (Top up with water if lentils are at any point not fully submerged.) Remove lid, stir in vinegar, and reduce until lentils are moist but not soupy. Season to taste with salt and pepper, cover, and keep warm until ready to serve. For the Eggplant: While lentils cook, cut each eggplant in half. Score flesh with the tip of a paring knife in a cross-hatch pattern at 1-inch intervals. Transfer to a foil-lined rimmed baking sheet, cut side up, and brush each eggplant half with 1 tablespoon oil, letting each brushstroke be fully absorbed before brushing with more. Season with salt and pepper. Place a rosemary sprig on top of each one. Transfer to oven and roast until completely tender and well charred, 25 to 35 minutes. Remove from oven and discard rosemary. To Serve: Heat 2 tablespoons olive oil and pine nuts in a medium skillet set over medium heat. Cook, tossing nuts frequently, until golden brown and aromatic, about 4 minutes. Transfer to a bowl to halt cooking. Stir half of parsley and rosemary into lentils and transfer to a serving platter. Arrange eggplant halves on top. Spread a few tablespoons of tahini sauce over each eggplant half and sprinkle with pine nuts. Sprinkle remaining parsley and rosemary, drizzle with additional olive oil, and serve.",
    image: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
    tags: ["Vegetarian","Pulse","Nutty"],
    youtube: "https://www.youtube.com/watch?v=HkywCtna9t0",
    source: "http://www.seriouseats.com/recipes/2016/03/roasted-eggplant-tahini-pine-nut-lentil-vegan-experience-recipe.html",
    ingredients: [
      { ingredient: "Olive Oil", measure: "2 tablespoons" },
      { ingredient: "Carrots", measure: "2 small cut into chunks" },
      { ingredient: "Celery", measure: "2 small stalks" },
      { ingredient: "Onion", measure: "1 medium finely diced" },
      { ingredient: "Garlic", measure: "6 medium cloves sliced" },
      { ingredient: "Brown Lentils", measure: "12 ounces (340g)" },
      { ingredient: "Bay Leaves", measure: "2" },
      { ingredient: "Water", measure: "4 cups" },
      { ingredient: "Salt", measure: "Pinch" },
      { ingredient: "Apple Cider Vinegar", measure: "2 teaspoons (10ml)" },
      { ingredient: "Pepper", measure: "Pinch" },
      { ingredient: "Egg Plants", measure: "2 large" },
      { ingredient: "Rosemary", measure: "4 sprigs" },
      { ingredient: "Pine nuts", measure: "1/4 cup" },
      { ingredient: "Parsley", measure: "2 tablespoons" }
    ]
  }
];

const populateDb = async () => {
  try {
    if (!config.MONGODB_URI) {
      logger.error("MONGODB_URI is not defined");
      process.exit(1);
    }
    logger.info("Connecting to MongoDB...");
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
    //limpiar bd
    await RecipeModel.deleteMany({});
    logger.info("Bd limpiada");
    const savedRecipes = await RecipeModel.insertMany(recipes);
    logger.info(`Inserted ${savedRecipes.length} recipes`);
    await mongoose.connection.close();
    logger.info("Base de datos poblada");
  } catch (error) {
    logger.error("Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

populateDb();
