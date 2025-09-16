import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList'

function MainView() {

    return (
        <>
            <Navbar view_name={'Recipes Explorer'} />
            <RecipeList />
        </>
    )
}

export default MainView;