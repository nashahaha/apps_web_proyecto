import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // estilo unificado tipo "link link-hover" — el que tenían Home y Recipes originalmente
  const navLink =
    'link link-hover text-slate-800 hover:text-orange-600 transition-colors duration-150';

  return (
    <header className="sticky top-0 z-50">
      {/* barra principal */}
      <div className="navbar bg-orange-200/95 text-slate-900 border-b border-orange-200 backdrop-blur supports-[backdrop-filter]:bg-orange-50/70 py-1">
        {/* icono + título */}
        <div className="flex-1 flex items-center gap-3 md:gap-4">
          <span
            className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-orange-200/70 ring-1 ring-orange-300/60 shrink-0"
            aria-hidden="true"
            title="cookie"
          >
            🍪
          </span>

          <Link to="/">
            <h1 className="inline-flex items-center leading-none text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 hover:text-orange-600 transition-colors">
              Ñom Ñom
            </h1>
          </Link>
        </div>

        {/* navegación */}
        <nav>
          <ul className="menu menu-horizontal px-1 text-sm items-center gap-2">
            <li>
              <Link to="/" className={navLink}>Home</Link>
            </li>

            <li>
              <details>
                <summary className={`${navLink} cursor-pointer`}>
                  Recipes
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2 shadow">
                  <li><a className={navLink}>Vegan</a></li>
                  <li><a className={navLink}>Vegetarian</a></li>
                  <li><a className={navLink}>No gluten</a></li>
                  <li><a className={navLink}>High Protein</a></li>
                </ul>
              </details>
            </li>

            {isAuthenticated ? (
              <li>
                <details>
                  <summary className={`${navLink} cursor-pointer`}>
                    {user?.name || 'My Profile'}
                  </summary>
                  <ul className="bg-base-100 rounded-t-none p-2 shadow">
                    <li><Link to="/profile" className={navLink}>Ver Perfil</Link></li>
                    <li><a className={navLink}>My Recipes</a></li>
                    <li>
                      <button onClick={handleLogout} className={`${navLink} !text-rose-500 hover:!text-rose-600 font-medium`}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <>
                <li><Link to="/login" className={navLink}>Login</Link></li>
                <li><Link to="/register" className={navLink}>Create Account</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* línea decorativa inferior */}
      <div className="h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400" />
    </header>
  );
};

export default Navbar;
