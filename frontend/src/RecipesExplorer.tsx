import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList'
import Footer from "./components/Footer"
import SearchBar from './components/SearchBar';

function RecipesExplorer() {

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center bg-base-200'>
                <SearchBar />
                <RecipeList />
            </div>

            <Footer />
        </>
    )
}

export default RecipesExplorer;