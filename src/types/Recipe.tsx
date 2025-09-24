export interface Recipe {
  id: string;
  name: string;
  category: string;
  image: string;
  instructions: string;
  ingredients: Array<{ ingredient: string; measure: string }>;
  tags?: string[];
}