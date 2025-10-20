import axios from 'axios';
import axiosSecure from '../utils/axiosSecure';

type Credentials = {
    email: string;
    password: string;
}

type registerCredentials = Credentials & {
    name: string;
}

const register = async (credentials: registerCredentials) => {
    const response = await axios.post('/api/auth/register', credentials, {
        withCredentials: true,
    });
    return response.data;
};

const login = async (credentials: Credentials) => {
    const response = await axios.post('/api/auth/login', credentials);

    const csrfToken = response.headers['x-csrf-token'];

    if (csrfToken) {
        localStorage.setItem('csrfToken', csrfToken);
    }

    return response.data;
};

const restoreLogin = async () => {
    try {
        const response = await axiosSecure.get('/api/auth/me');
        return response.data;
    } catch (error) {
        return null;
    }
};

const logout = async () => {
    await axios.post('/api/auth/logout');
    localStorage.removeItem('csrfToken');
};

export default { login, restoreLogin, logout, register };