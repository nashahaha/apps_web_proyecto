import Navbar from '../components/Navbar';
import RecipeList from '../components/RecipeList'
import Footer from "../components/Footer"
import SearchBar from '../components/SearchBar';
import Layout from 'components/Layout';

function RecipesExplorer() {

    return (
        <>
            <Layout>
                <div className='flex flex-col items-center bg-base-200'>
                    <SearchBar />
                    <RecipeList />
                </div>
            </Layout>
        </>
    )
}

export default RecipesExplorer;