import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useRecipesStore } from "../stores/recipeStores";
import FavoriteButton from "./FavoriteButton";

interface FavoriteToggleProps {
  recipeId: string;
  size?: number;
  stopPropagation?: boolean;
}

const FavoriteToggle = ({ recipeId, size = 24, stopPropagation }: FavoriteToggleProps) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const favoriteRecipes = useRecipesStore(state => state.favoriteRecipes);
    const addToFavorites = useRecipesStore(state => state.addToFavorites);
    const removeFromFavorites = useRecipesStore(state => state.removeFromFavorites);
    const fetchFavorites = useRecipesStore(state => state.fetchFavorites);

    // Verificar si la receta está en favoritos
    const isFavorite = favoriteRecipes.some((r) => r.id === recipeId);

    // Cargar favoritos solo si está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            fetchFavorites();
        }
    }, [isAuthenticated, fetchFavorites]);

    const handleToggle = async () => {
        if (!isAuthenticated) {
            // Opcional: mostrar mensaje o redirigir a login
            return;
        }

        try {
            if (isFavorite) {
                await removeFromFavorites(recipeId);
            } else {
                await addToFavorites(recipeId);
            }
        } catch (err) {
            console.error("Error actualizando favoritos:", err);
        }
    };

    // No mostrar el botón si no está autenticado
    if (!isAuthenticated) {
        return null;
    }

    return ( <FavoriteButton active={isFavorite} onToggle={handleToggle} stopPropagation={stopPropagation} size={size} />);
};

export default FavoriteToggle;