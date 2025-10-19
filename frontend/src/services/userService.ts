import axiosSecure from '../utils/axiosSecure';

const getFavoriteRecipes = async () => {
    const response = await axiosSecure.get('/api/users/favorites');
    return response.data;
};

const addToFavorites = async (recipeId: string) => {
    await axiosSecure.post(`/api/users/favorites/${recipeId}`);
};

const removeFromFavorites = async (recipeId: string)=> {
    await axiosSecure.delete(`/api/users/favorites/${recipeId}`);
};

const getUserRecipes = async () => {
    const response = await axiosSecure.get('/api/users/recipes');
    return response.data;
};

export default { getFavoriteRecipes, addToFavorites, removeFromFavorites, getUserRecipes };
