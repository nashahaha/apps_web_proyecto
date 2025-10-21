import { useState, useEffect } from "react";

const SearchBar = () => {
    const [tagsList, setTagsList] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [filterTags, setFiltradas] = useState<string[]>([]); // ingredientes agregados

    useEffect(() => {
        fetch("http://localhost:3001/api/recipes") 
        .then((res) => res.json())
        .then((data) => {
            // extraer ingredientes de recetas
            const allIngredients = Array.from(
            new Set(
                data.flatMap((recipe: any) =>
                recipe.ingredients.map((i: any) => i.ingredient)
                )
            )
            );
            setTagsList(allIngredients as string[]);
        })
        .catch((err) => console.error("Error cargando recetas:", err));
    }, []);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = (tag?: string) => {
        const newTag = (tag ?? inputValue).trim();
        if (newTag !== "" && !tags.includes(newTag) && tagsList.includes(newTag)) {
            setTags((prev) => [...prev, newTag]);
        }
        setInputValue("");
    }


    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Filtrar opciones según el texto
        if (value.trim() === "") {
            setFiltradas([]);
        } else {
            setFiltradas(
                tagsList.filter((t) =>
                    t.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const handleSelect = (option: string) => {
        //setInputValue(option); // Pone la opción seleccionada en el input
        addTag(option);
        setFiltradas([]); // Cierra el menú
    };


    return (
        <div className="p-4 flex flex-col gap-4 items-center">
            <div className="w-80">
            {/* contenedor relativo para posicionar la lupita */}
            <div className="relative input rounded-full flex flex-wrap items-center gap-2">
                {/* Tags de ingredientes */}
                {tags.map((tag) => (
                <span
                    key={tag}
                    className="bg-green-400 text-white rounded-full px-2 py-1 flex items-center gap-1"
                >
                    {tag}
                    <button
                    type="button"
                    className="ml-1 text-white font-bold"
                    onClick={() => removeTag(tag)}
                    >
                    ×
                    </button>
                </span>
                ))}

                {/* Input (con padding a la derecha para la lupita) */}
                <input
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                className="flex-1 bg-transparent pr-10 outline-none"
                />

                {/* Lupita dentro del input, extremo derecho */}
                <button
                type="button"
                onClick={() => addTag()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-orange-100 transition"
                aria-label="Buscar"
                title="Buscar"
                >
                {/* Ícono magnifying glass (SVG) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                </button>
            </div>
            {/* Opciones de tags */}
            <div>
                {filterTags.length > 0 && (
                <ul className="menu bg-base-100 shadow rounded-box mt-2 w-full">
                    {filterTags.slice(0, 7).map((tag) => (
                    <li key={tag}>
                        <button onClick={() => handleSelect(tag)}>{tag}</button>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            </div>
        </div>
    )
}

export default SearchBar;