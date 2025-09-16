interface headerProps {
    view_name: string; // nombre de la sección a la que pertenece el header
};

const Navbar = ({ view_name }: headerProps) => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">{view_name}</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li>
                        <details>
                            <summary>Recipes</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Vegan</a></li>
                                <li><a>Vegetarian</a></li>
                                <li><a>No gluten</a></li>
                                <li><a>High Protein</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>My profile</a></li>
                </ul>
            </div>
        </div >
    )
}

export default Navbar;