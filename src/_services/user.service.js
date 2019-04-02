import { Cookies } from 'react-cookie';
import config from 'config';

export const userService = {
    login,
    register,
};

const cookie = new Cookies();

function createRequestOptions(data) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'same-origin',
    }
}

function login(username, password) {
    let data = {
        username: username,
        password: password,
    };
    const requestOptions = createRequestOptions(data);

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            cookie.set('token', user.token);

            return user;
        });
}

function register(user) {
    const requestOptions = createRequestOptions(user);

    return fetch(`${config.apiUrl}/auth/registration`, requestOptions)
        .then(handleResponse)
        .then(user => {
            cookie.set('token', user.token);

            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (response.status == 400) {
            if (data.error.message) {
                const error = data.error.message;
                return Promise.reject(error);
            }
        }
        if (!response.ok) {
            const error = data.error[0].message;
            return Promise.reject(error);
        }

        return data;
    })
}
