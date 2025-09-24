interface navbarProps {
    view_name: string; // nombre de la sección a la que pertenece el header
};

const Navbar = ({ view_name }: navbarProps) => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 h-16">
            <div className="flex-1">
                <a className="text-xl">{view_name}</a>
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