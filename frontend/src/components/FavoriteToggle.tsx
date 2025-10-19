import { useState, useEffect } from "react";
import userService from "../services/userService";
import FavoriteButton from "./FavoriteButton";

interface FavoriteToggleProps {
  recipeId: string;
  size?: number;
  stopPropagation?: boolean;
}

const FavoriteToggle = ({ recipeId, size = 24, stopPropagation }: FavoriteToggleProps) => {
    const [fav, setFav] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const checkFavorite = async () => {
        try {
            const favorites = await userService.getFavoriteRecipes();
            const isFav = favorites.some((r) => r.id === recipeId);
            setFav(isFav);
        } catch (err) {
            console.error("Error verificando favoritos:", err);
        }
    };
    checkFavorite();
    }, [recipeId]);

    const handleToggle = async () => {
    try {
        setLoading(true);
        if (fav) {
            await userService.removeFromFavorites(recipeId);
            setFav(false);
        } else {
            await userService.addToFavorites(recipeId);
            setFav(true);
        }
    } catch (err) {
        console.error("Error actualizando favoritos:", err);
    } finally {
        setLoading(false);
    }
    };

    return ( <FavoriteButton active={fav} onToggle={handleToggle} stopPropagation={stopPropagation} size={size} />);
};

export default FavoriteToggle;