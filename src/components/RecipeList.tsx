import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import Navbar from "./Navbar";
import Footer from "./Footer";


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
    <div>
      <Navbar view_name="Recipe List" />
      <div className="px-10 pb-5 flex flex-wrap gap-4">
        {recipes.map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
          className="block hover:shadow-lg transition-shadow"
        >
        <Recipe
          key={recipe.id}
          img_path={recipe.image}     
          rec_title={recipe.name}       
          category={recipe.category}   
          difficulty={"-"}
          instructions={""}
          ingredients={[]}
        />
        </Link>
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeList;
