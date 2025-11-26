import { create } from 'zustand';
import axios from 'axios';
import axiosSecure from '../utils/axiosSecure';

interface Recipe {
  id: string;
  name: string;
  category: string;
  instructions: string;
  image: string;
  ingredients: Array<{ ingredient: string; measure: string }>;
  author?: string;
}

interface RecipesState {
  recipes: Recipe[];
  myRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  tags: string[];

  fetchRecipes: () => Promise<void>;
  setTags: (tags: string[]) => void;
  fetchMyRecipes: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  selectRecipe: (id: string) => Promise<void>;
  createRecipe: (recipe: Partial<Recipe>) => Promise<void>;
  addCreatedRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  addToFavorites: (recipeId: string) => Promise<void>;
  removeFromFavorites: (recipeId: string) => Promise<void>;
}

export const useRecipesStore = create<RecipesState>((set, get) => ({
  recipes: [],
  myRecipes: [],
  favoriteRecipes: [],
  selectedRecipe: null,
  loading: false,
  tags: [],

  fetchRecipes: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosSecure.get('/api/recipes');
      set({ recipes: data, loading: false });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      set({ loading: false });
    }
  },

  setTags: (tags) => {
    set({ tags });
  },

  fetchMyRecipes: async () => {
    try {
      const { data } = await axiosSecure.get('/api/users/recipes');
      set({ myRecipes: data });
    } catch (error) {
      // Silenciar error 401 cuando no hay sesión
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error('Error fetching my recipes:', error);
      }
      set({ myRecipes: [] });
    }
  },

  fetchFavorites: async () => {
    try {
      const { data } = await axiosSecure.get('/api/users/favorites');
      set({ favoriteRecipes: data });
    } catch (error) {
      // Silenciar error 401 cuando no hay sesión
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error('Error fetching favorites:', error);
      }
      set({ favoriteRecipes: [] });
    }
  },

  selectRecipe: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axiosSecure.get(`/api/recipes/${id}`);
      set({ selectedRecipe: data, loading: false });
    } catch (error) {
      console.error('Error fetching recipe:', error);
      set({ loading: false });
    }
  },

  createRecipe: async (recipe) => {
    try {
      const { data } = await axiosSecure.post('/api/recipes', recipe);
      set((state) => ({
        recipes: [...state.recipes, data],
        myRecipes: [...state.myRecipes, data]
      }));
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error; // Re-lanzar para que el componente pueda manejarlo
    }
  },

  addCreatedRecipe: (recipe) => {
    set((state) => ({
      recipes: [...state.recipes, recipe],
      myRecipes: [...state.myRecipes, recipe]
    }));
  },

  updateRecipe: async (id, recipe) => {
    try {
      const { data } = await axiosSecure.put(`/api/recipes/${id}`, recipe);
      set((state) => ({
        recipes: state.recipes.map(r => r.id === id ? data : r),
        myRecipes: state.myRecipes.map(r => r.id === id ? data : r),
        selectedRecipe: state.selectedRecipe?.id === id ? data : state.selectedRecipe
      }));
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axiosSecure.delete(`/api/recipes/${id}`);
      set((state) => ({
        recipes: state.recipes.filter(r => r.id !== id),
        myRecipes: state.myRecipes.filter(r => r.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },

  addToFavorites: async (recipeId) => {
    try {
      await axiosSecure.post(`/api/users/favorites/${recipeId}`);
      const recipe = get().recipes.find(r => r.id === recipeId);
      if (recipe) {
        set((state) => ({
          favoriteRecipes: [...state.favoriteRecipes, recipe]
        }));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (recipeId) => {
    try {
      await axiosSecure.delete(`/api/users/favorites/${recipeId}`);
      set((state) => ({
        favoriteRecipes: state.favoriteRecipes.filter(r => r.id !== recipeId)
      }));
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },
}));