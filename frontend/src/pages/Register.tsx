import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Layout from '../components/Layout';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const register = useAuthStore(state => state.register);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password);
            navigate('/');
        } catch (error: any) {
            if (error.response?.status === 409) {
                setError('This email is already registered. Please login instead.');
            } else {
                setError(error.response?.data?.error || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Layout>
                <div className="flex-1 flex items-center justify-center px-4 py-12 bg-base-200">
                    <div className="card w-full max-w-md bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
                                Create Account
                            </h2>

                            {error && (
                                <div className="alert alert-error mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="input input-bordered w-full"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className={`btn bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600 w-full ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating account...' : 'Register'}
                                    </button>
                                </div>
                            </form>

                            <div className="divider">OR</div>

                            <div className="text-center">
                                <p className="text-sm">
                                    Already have an account?{' '}
                                    <Link to="/login" className="link link-primary font-semibold">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Register;