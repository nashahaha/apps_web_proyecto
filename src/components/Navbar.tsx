const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* barra principal, más baja y con color suave */}
      <div className="navbar bg-orange-200/95 text-slate-900 border-b border-orange-200 backdrop-blur supports-[backdrop-filter]:bg-orange-50/70 py-1">
        <div className="flex-1 flex items-center gap-3 md:gap-4">
          {/* Galleta primero */}
          <span
            className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-orange-200/70 ring-1 ring-orange-300/60 shrink-0"
            aria-hidden="true"
            title="cookie"
          >
            🍪
          </span>

          {/* Título */}
          <h1 className="inline-flex items-center leading-none text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            Ñom Ñom
          </h1>
        </div>

        <nav className="flex-none">
          <ul className="menu menu-horizontal px-1 text-sm">
            <li><a className="link link-hover">Home</a></li>
            <li>
              <details>
                <summary className="cursor-pointer">Recipes</summary>
                <ul className="bg-base-100 rounded-t-none p-2 shadow">
                  <li><a className="link link-hover">Vegan</a></li>
                  <li><a className="link link-hover">Vegetarian</a></li>
                  <li><a className="link link-hover">No gluten</a></li>
                  <li><a className="link link-hover">High Protein</a></li>
                </ul>
              </details>
            </li>
            <li><a className="link link-hover">My profile</a></li>
          </ul>
        </nav>
      </div>

      {/* separador minimalista */}
      <div className="h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400" />
    </header>
  );
};

export default Navbar;
