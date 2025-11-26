import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecipesStore } from "../stores/recipeStores";
import { useAuthStore } from "../stores/authStore";
import Navbar from "../components/Navbar";

import FavoriteToggle from "../components/FavoriteToggle";
import Layout from "../components/Layout";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = useRecipesStore(state => state.selectedRecipe);
  const selectRecipe = useRecipesStore(state => state.selectRecipe);
  const deleteRecipe = useRecipesStore(state => state.deleteRecipe);
  const loading = useRecipesStore(state => state.loading);
  const currentUser = useAuthStore(state => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      selectRecipe(id);
    }
  }, [id, selectRecipe]);

  const imageUrl = recipe?.image;
  
  // Check if current user is the recipe owner
  let isOwner = false;
  if (currentUser && recipe?.author) {
    isOwner = recipe.author.id === currentUser.id;
  }

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await deleteRecipe(id);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error al eliminar la receta');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (

    <Layout>
      <div>
        {recipe && (
          <div className="pb-15">
            <div className="flex items-center justify-between p-4">
              {/* Back button */}
              <Link to={`/`} className="btn w-40">
                Back to Recipe List
              </Link>

              {/* Title */}
              <h1 className="text-2xl font-bold text-center flex-1">
                {recipe.name}
              </h1>

              {/* Edit/Delete buttons for owner */}
              {isOwner && (
                <div className="flex gap-2 w-40 justify-end">
                  <Link to={`/recipe/${id}/edit`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                  <button 
                    onClick={() => setShowDeleteModal(true)} 
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
              {!isOwner && <div className="w-40"></div>}
            </div>

            <div className="card card-side justify-center items-start">
              <div className="relative inline-block max-w-[500px] overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={recipe.name}
                  className="block w-full h-auto object-cover"
                />

                {id && (
                  <div className="absolute top-2 right-2">
                    <FavoriteToggle recipeId={id} size={28} />
                  </div>
                )}
              </div>
              <div className="card-body max-w-xl">
                <p className="mt-4">Category: {recipe.category}</p>

                <h2 className="mt-6 text-xl font-semibold">Ingredients:</h2>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>
                      {item.ingredient} - {item.measure}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-6 text-xl font-semibold">Instructions:</h2>
                <p className="mt-2">{recipe.instructions}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Recipe</h3>
            <p className="py-4">Are you sure you want to delete this recipe? This action cannot be undone.</p>
            <div className="modal-action">
              <button onClick={() => setShowDeleteModal(false)} className="btn">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>

  );
};

export default RecipeDetail;