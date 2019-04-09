import { Cookies } from 'react-cookie';
import config from 'config';
import { login as LoginRequest } from '../_helpers';
import { createRequestOptions } from './';

export const userService = {
    login,
    register,
};

const cookie = new Cookies();

function login(username, password) {
    let data = {
        username: username,
        password: password,
    };
    const requestOptions = createRequestOptions(data);

    return LoginRequest(requestOptions);
}

function register(user) {
    const requestOptions = createRequestOptions(user);

    return fetch(`${config.apiUrl}/auth/registration`, requestOptions)
        .then(handleResponse)
        .then(user => {
            cookie.set('access_token', user.access_token);
            cookie.set('refresh_token', user.refresh_token);

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
