import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipesStore } from "../stores/recipeStores";
import axiosSecure from "../utils/axiosSecure";
import Layout from "./Layout";

type Ingredient = {
    ingredient: string;
    measure: string;
};

function EditRecipeForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { selectedRecipe, selectRecipe, updateRecipe } = useRecipesStore();
    
    const [recipeName, setRecipeName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [allIngredients, setAllIngredients] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Load ingredients from database
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axiosSecure.get('/api/ingredients');
                const dbIngredients = response.data.map((ing: any) => 
                    ing.name.charAt(0).toUpperCase() + ing.name.slice(1)
                );
                setAllIngredients(dbIngredients.sort());
            } catch (error) {
                console.error("Error loading ingredients:", error);
            }
        };
        fetchIngredients();
    }, []);

    useEffect(() => {
        const loadRecipe = async () => {
            if (id) {
                await selectRecipe(id);
                setLoading(false);
            }
        };
        loadRecipe();
    }, [id, selectRecipe]);

    useEffect(() => {
        if (selectedRecipe) {
            setRecipeName(selectedRecipe.name);
            setInstructions(selectedRecipe.instructions);
            setIngredients(selectedRecipe.ingredients || []);
        }
    }, [selectedRecipe]);

    const addIngredient = () => {
        setIngredients([...ingredients, { ingredient: "", measure: "" }]);
    };

    const removeIngredient = (index: number) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated.length > 0 ? updated : [{ ingredient: "", measure: "" }]);
    };

    const updateIngredientField = (index: number, field: keyof Ingredient, value: string) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validIngredients = ingredients.filter(
            (ing) => ing.ingredient.trim() !== "" && ing.measure.trim() !== ""
        );

        if (!id || !recipeName || !instructions || validIngredients.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        // Save new ingredients to database
        for (const ing of validIngredients) {
            const ingredientName = ing.ingredient.trim();
            if (!allIngredients.some(i => i.toLowerCase() === ingredientName.toLowerCase())) {
                try {
                    await axiosSecure.post('/api/ingredients', { name: ingredientName });
                    setAllIngredients(prev => [...prev, ingredientName].sort());
                } catch (error) {
                    console.error("Error saving ingredient:", error);
                }
            }
        }

        try {
            await updateRecipe(id, {
                name: recipeName,
                instructions: instructions,
                ingredients: validIngredients,
            });
            navigate(`/recipe/${id}`);
        } catch (error) {
            console.error("Error updating recipe:", error);
            alert("Error updating recipe. Please try again.");
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
                        <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>

                        <label className="label">Recipe Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Recipe name"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            required
                        />

                        <label className="label mt-4">Ingredients</label>
                        {ingredients.map((ing, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    className="input input-bordered flex-1"
                                    placeholder="Ingredient name"
                                    value={ing.ingredient}
                                    onChange={(e) => updateIngredientField(index, "ingredient", e.target.value)}
                                    list="ingredients-list"
                                    required
                                />
                                <input
                                    type="text"
                                    className="input input-bordered w-32"
                                    placeholder="Amount + unit"
                                    value={ing.measure}
                                    onChange={(e) => updateIngredientField(index, "measure", e.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-circle btn-outline text-red-500"
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        
                        <datalist id="ingredients-list">
                            {allIngredients.map((ing, idx) => (
                                <option key={idx} value={ing} />
                            ))}
                        </datalist>

                        <button
                            type="button"
                            className="btn btn-outline btn-sm mt-2"
                            onClick={addIngredient}
                        >
                            + Add Ingredient
                        </button>

                        <label className="label mt-4">Instructions</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-40"
                            placeholder="Enter your recipe instructions..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                        ></textarea>

                        <div className="flex gap-3 mt-6">
                            <button className="btn btn-primary flex-1" type="submit">
                                Save Changes
                            </button>
                            <button 
                                className="btn btn-outline flex-1" 
                                type="button"
                                onClick={() => navigate(`/recipe/${id}`)}
                            >
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </Layout>
    );
}

export default EditRecipeForm;
