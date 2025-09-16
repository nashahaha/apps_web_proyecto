import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

interface recipeProps {
    img_path: string; // ruta de la imagen
    rec_title: string;
    prep_time: string;
    difficulty: string;
};

const Recipe = ({ img_path, rec_title, prep_time, difficulty }: recipeProps) => {
    const [fav, setFav] = useState(false);

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img_path} className="rounded-xl"></img>
            </figure>


            <div className="card-body">
                <div >
                    <h1 className="card-title">{rec_title}
                        <button
                            className="btn btn-ghost btn-circle"
                            onClick={() => setFav(!fav)}
                        >
                            {fav ? (
                                <StarSolid className="h-6 w-6 text-yellow-500" />
                            ) : (
                                <StarOutline className="h-6 w-6 text-gray-500" />
                            )}
                        </button>

                    </h1>

                </div>

                <p>Preparation time: {prep_time} | Difficulty: {difficulty}</p>
            </div>


        </div>
    )
};

export default Recipe;