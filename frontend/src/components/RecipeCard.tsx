import type { Recipe } from "../types/Recipe";
import FavoriteToggle from "./FavoriteToggle";


interface RecipeCardProps {
  recipe: Recipe;
  variant?: "card" | "detail";
}
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { id, name, category, image } = recipe;
  const imageUrl = image.startsWith("/uploads/")
    ? `http://localhost:3001${recipe.image}`
    : recipe?.image;


  return (
    <div className="card bg-base-100 w-80 h-[390px] shadow-xl overflow-hidden">
      {/* Imagen con overlays */}
      <div className="relative w-full aspect-[4/3]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Favoritos: arriba-derecha */}
        <div className="absolute top-2 right-2">
          <FavoriteToggle recipeId={id} stopPropagation />
        </div>

        {/* Categoría: abajo-izquierda */}
        <span className="absolute left-2 bottom-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
          {category}
        </span>
      </div>

      <div className="card-body p-4">
        {/* Título máx. 2 líneas + … */}
        <h1 className="card-title text-base leading-tight line-clamp-2">
          {name}
        </h1>
      </div>
    </div>
  )
};

export default RecipeCard;