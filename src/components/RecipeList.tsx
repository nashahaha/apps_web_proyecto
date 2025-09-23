import { useState, useEffect } from "react";
import Recipe from "./Recipe";

interface RecipeData {
  id: string;
  name: string;
  category: string;
  image: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className="px-10 pb-5 flex flex-wrap gap-4">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.id}
          img_path={recipe.image}     
          rec_title={recipe.name}       
          category={recipe.category}   
          difficulty={"-"}         
        />
      ))}
    </div>
  );
};

export default RecipeList;
