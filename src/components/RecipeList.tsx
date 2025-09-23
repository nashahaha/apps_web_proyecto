import { useState, useEffect } from "react";
import Recipe from "./Recipe";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();
  return (
    <div>
      <Navbar view_name="Recipe List" />
      <div className="px-10 pb-5 flex flex-wrap gap-4">
        {recipes.map(recipe => (

          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="block hover:shadow-lg transition-shadow cursor-pointer"
          >

            <Recipe
              key={recipe.id}
              img_path={recipe.image}
              rec_title={recipe.name}
              category={recipe.category}
              instructions={""}
              ingredients={[]}
            />
          </div>

        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeList;
