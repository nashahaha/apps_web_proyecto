import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipesStore } from "../stores/recipeStores";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const recipes = useRecipesStore(state => state.recipes);
  const fetchRecipes = useRecipesStore(state => state.fetchRecipes);
  const loading = useRecipesStore(state => state.loading);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <Navbar />
      <SearchBar />
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="px-10 pb-5 flex flex-wrap gap-4">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="block hover:shadow-lg transition-shadow cursor-pointer"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecipeList;