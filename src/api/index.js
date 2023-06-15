const API_ENDPOINTS = {
    register: "/users/register",
    login: "/users/login", 
    account: "/users/me",
    routinesUser: "/users/:username/routines"

}

const URL = (path) => {
    const url = 'https://fitnesstrackerbackend-8gy0.onrender.com' + path;
    return url;
}

export const BASE_URL = `https://fitnesstrackerbackend-8gy0.onrender.com/api`;