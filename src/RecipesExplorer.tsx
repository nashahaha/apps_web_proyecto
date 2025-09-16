import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList'
import Footer from "./components/Footer"

function RecipesExplorer() {

    return (
        <>
            <Navbar view_name={'Recipes Explorer'} />
            <RecipeList />
            <Footer />
        </>
    )
}

export default RecipesExplorer;