export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  area?: string;
  instructions: string;
  image: string;
  tags?: string[];
  youtube?: string;
  source?: string;
  ingredients: Ingredient[];
  author?: {
    id: string;
    name: string;
    email: string;
  };
}