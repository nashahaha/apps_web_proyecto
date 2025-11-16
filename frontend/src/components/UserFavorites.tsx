import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipesStore } from "../stores/recipeStores";
import { useAuthStore } from "../stores/authStore";

const UserFavorites = () => {
const favoriteRecipes = useRecipesStore(state => state.favoriteRecipes);
const fetchFavorites = useRecipesStore(state => state.fetchFavorites);
const isAuthenticated = useAuthStore(state => state.isAuthenticated);
const loading = useRecipesStore(state => state.loading);

useEffect(() => {
    if (isAuthenticated) {
        fetchFavorites();
    }
}, [isAuthenticated, fetchFavorites]);

if (loading) return <p className="text-center text-gray-500">Loading...</p>;

if (favoriteRecipes.length === 0) {
    return (
    <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">❤️</div>
        <h3 className="text-sm font-medium text-gray-900">
        You don't have any favorites yet...
        </h3>
        <p className="text-sm text-gray-500">Explore recipes and mark them as your favorites.</p>
    </div>
    );
}

return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover"/>
                <span className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
                    {recipe.category}
                </span>
                </div>
                
                <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900">
                        {recipe.name}
                    </h4>
                
                    <Link to={`/recipe/${recipe.id}`} className="inline-flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
                        Ver Receta 
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
    ))}
    </div>
);
};

export default UserFavorites;
