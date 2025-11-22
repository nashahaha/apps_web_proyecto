import axiosSecure from '../utils/axiosSecure';

type Credentials = {
    email: string;
    password: string;
}

type registerCredentials = Credentials & {
    name: string;
}

const register = async (credentials: registerCredentials) => {
    const response = await axiosSecure.post('/api/auth/register', credentials, {
        withCredentials: true,
    });
    return response.data;
};

const login = async (credentials: Credentials) => {
    const response = await axiosSecure.post('/api/auth/login', credentials);

    const csrfToken = response.headers['x-csrf-token'] || response.headers['X-CSRF-Token'];

    if (csrfToken) {
        localStorage.setItem('csrfToken', csrfToken);
        console.log('CSRF Token saved:', csrfToken);
    } else {
        console.log('No CSRF token received in response headers');
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
    await axiosSecure.post('/api/auth/logout');
    localStorage.removeItem('csrfToken');
};

export default { login, restoreLogin, logout, register };