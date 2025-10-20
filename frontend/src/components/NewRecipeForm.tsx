import { useState } from "react";

function NewRecipeForm() {
    const unit = ["unit", "ml", "g", "tsp", "tbsp", "cup"];
    const allIngredients = ["Eggplant", "Tomato", "Onion", "Garlic", "Olive Oil"];
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    type Ingredient = {
        amount: number;
        unit: string;
        name: string;
    };

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { amount: 0, unit: unit[0], name: "" },
    ]);

    // Manejar imagen subida
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Función para actualizar un campo de un ingrediente
    const updateIngredient = (index: number, field: keyof Ingredient, value: any) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);

        // Si se completa el último campo (cantidad > 0 y name no vacío), agrega uno nuevo
        const last = updated[updated.length - 1];
        if (last.amount > 0 && last.name.trim() !== "") {
            setIngredients([...updated, { amount: 0, unit: unit[0], name: "" }]);
        }
    };

    // Agregar manualmente un nuevo input
    const addIngredient = () => {
        setIngredients([...ingredients, { amount: 0, unit: unit[0], name: "" }]);
    };

    // Eliminar un input
    const removeIngredient = (index: number) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated.length > 0 ? updated : [{ amount: 0, unit: unit[0], name: "" }]);
    };

    // Lista final (solo los completados)
    const completed = ingredients.filter((ing) => ing.amount > 0 && ing.name.trim() !== "");

    return (
        <div>
            <fieldset className="fieldset bg-base-500 border-base-300 rounded-box w-xl border p-4">
                {/* Imagen previa */}
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Recipe preview"
                        className="w-64 h-64 object-cover rounded-xl self-center shadow-md"
                    />
                )}


                {/* Input de imagen */}
                <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <label className="label">Recipe Name</label>
                <input
                    type="text"
                    className="input w-130"
                    placeholder="Roasted Eggplant With Tahini, Pine Nuts, and Lentils"
                    required
                />

                <label className="label">Ingredients:</label>

                {/* Inputs dinámicos */}
                <div className="flex flex-col gap-3">
                    {ingredients.map((ing, index) => (
                        <div key={index} className="join flex gap-2 items-center">
                            {/* 1️⃣ Cantidad */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="btn btn-circle"
                                    onClick={() =>
                                        updateIngredient(index, "amount", Math.max(0, ing.amount - 1))
                                    }
                                    type="button"
                                >
                                    -
                                </button>

                                <input
                                    type="number"
                                    className="input input-bordered w-20 text-center"
                                    value={ing.amount}
                                    onChange={(e) =>
                                        updateIngredient(index, "amount", Number(e.target.value))
                                    }
                                    min="0"
                                />

                                <button
                                    className="btn btn-circle"
                                    onClick={() => updateIngredient(index, "amount", ing.amount + 1)}
                                    type="button"
                                >
                                    +
                                </button>
                            </div>

                            {/* 2️⃣ Unidad */}
                            <select
                                className="select select-bordered w-24"
                                value={ing.unit}
                                onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                            >
                                {unit.map((u) => (
                                    <option key={u} value={u}>
                                        {u}
                                    </option>
                                ))}
                            </select>

                            {/* 3️⃣ Nombre del ingrediente */}
                            <div className="flex flex-col">
                                <input
                                    list="ingredients-list"
                                    className="input input-bordered w-40"
                                    placeholder="Search ingredient..."
                                    value={ing.name}
                                    onChange={(e) => updateIngredient(index, "name", e.target.value)}
                                />

                                <datalist id="ingredients-list">
                                    {allIngredients.map((ingOpt) => (
                                        <option key={ingOpt} value={ingOpt} />
                                    ))}
                                </datalist>
                            </div>

                            {/* Botón para eliminar */}
                            <button
                                className="btn btn-circle btn-outline text-red-500"
                                type="button"
                                onClick={() => removeIngredient(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Botón para agregar nuevo */}
                <div className="mt-3">
                    <button className="btn btn-outline" type="button" onClick={addIngredient}>
                        Add New Ingredient
                    </button>
                </div>

                {/* Lista de ingredientes completados */}
                {completed.length > 0 && (
                    <div className="mt-5">
                        <h3 className="font-bold mb-2">Added Ingredients:</h3>
                        <ul className="list-disc list-inside">
                            {completed.map((ing, i) => (
                                <li key={i}>
                                    {ing.amount} {ing.unit} {ing.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                <textarea
                    className="textarea w-130 h-50 mt-5"
                    placeholder="Enter your recipe intructions..."
                    required
                ></textarea>

                <button className="btn mt-3" type="submit">
                    Publish Recipe
                </button>
            </fieldset>
        </div>
    );
}


export default NewRecipeForm;