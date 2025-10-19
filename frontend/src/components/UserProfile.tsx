import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import Navbar from './Navbar';
import UserFavorites from './UserFavorites';

const UserProfile = () => {
    const { user } = useAuth();
    if (!user) {
        return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Perfil de Usuario</h2>
            <p className="text-gray-600">No hay usuario autenticado</p>
        </div>
        );
    }
    return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 bg-gray-50 py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header del perfil */}
        <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-8">
            <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </span>
                </div>
            </div>

            {/* Información del usuario */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
            </div>
            </div>
        </div>
        </div>

        {/* Secciones de recetas */}
        <div className="space-y-6">
        {/* Mis Recetas */}
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Mis Recetas</h2>
            </div>
            </div>
            <div className="px-6 py-8">
            <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes recetas creadas</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Crea tu primera receta!
                </p>
                <div className="mt-6">
                <button type="button" onClick={() => {alert('Todavía no se implementa :P');}} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                    ➕ Crear receta
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* Recetas Favoritas */}
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recetas Favoritas</h2>
            </div>
            </div>
            <div className="px-6 py-8">
                <UserFavorites />
            </div>
        </div>
        </div>
    </div>
    </div>
    <Footer />
    </div>
);
};

export default UserProfile;
