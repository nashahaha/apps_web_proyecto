import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import NewRecipeForm from "../components/NewRecipeForm"

const AddNewRecipe = () => {
    return (
        <div>
            <Navbar />
            <NewRecipeForm></NewRecipeForm>
            <Footer />
        </div>
    )
}

export default AddNewRecipe