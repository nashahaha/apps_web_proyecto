import { useState } from "react";

const SearchBar = () => {
    //const [filters, setFilters] = useState([])

    //const ingredient = ["butter", "milk", "egg", "cheese", "pepper", "potato"]

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="w-80">
                <label className="input validator rounded-full">

                    <input type="text" placeholder="Buscar..." required />
                </label>
                <div className="validator-hint hidden">Enter a valid recipe or ingredient</div>
            </div>
            <button className="btn btn-wide rounded-full">Search Recipe</button>
        </div>
    )
}

export default SearchBar;