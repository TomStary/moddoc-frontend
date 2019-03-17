import { config } from 'config'

export const userService = {
    login,
};

function login(username, password) {
    let data = {
        username: username,
        password: password,
    };
    const  requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}