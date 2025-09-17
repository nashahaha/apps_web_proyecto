import Recipe from "./Recipe";

const recipes = [{
    id: 1,
    img_path: "src/assets/pasta.jpg",
    rec_title: "Pasta con salsa",
    prep_time: "30 min",
    difficulty: "Easy"
},
{
    id: 2,
    img_path: "src/assets/pollo_con_pure.jpeg",
    rec_title: "Puré con pollo",
    prep_time: "1 hr",
    difficulty: "Medium"
},
{
    id: 3,
    img_path: "src/assets/pimenton_relleno.jpg",
    rec_title: "Pimentón Relleno",
    prep_time: "1 hr",
    difficulty: "Medium"
},
{
    id: 4,
    img_path: "src/assets/salmon.jpg",
    rec_title: "Salmón con crema",
    prep_time: "1 hr 30 min",
    difficulty: "High"
},
{
    id: 5,
    img_path: "src/assets/crema_de_pollo.jpg",
    rec_title: "Crema de pollo",
    prep_time: "1 hr",
    difficulty: "Easy"
},
]

const RecipeList = () => {
    return (
        <div className="px-10 pb-5 flex flex-wrap gap-4">
            {recipes.map(recipe =>
                <Recipe
                    key={recipe.id}
                    img_path={recipe.img_path}
                    rec_title={recipe.rec_title}
                    prep_time={recipe.prep_time}
                    difficulty={recipe.difficulty} />)}
        </div>
    )
};

export default RecipeList;