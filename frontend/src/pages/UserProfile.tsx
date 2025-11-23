import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserFavorites from '../components/UserFavorites';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../stores/authStore';

const UserProfile = () => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h2>
                <p className="text-gray-600">No authenticated user</p>
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
                                    <h2 className="text-lg font-medium text-gray-900">My Recipes</h2>
                                </div>
                            </div>
                            <div className="px-6 py-8">
                                <div className="text-center py-12">
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">You haven't created any recipes yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Create your First!
                                    </p>
                                    <div className="mt-6">
                                        <button type="button" onClick={() => navigate("/newRecipe")} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                                            ➕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recetas Favoritas */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Favorite Recipes</h2>
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
