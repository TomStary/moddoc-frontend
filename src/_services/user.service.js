
import config from 'config';
import { Cookies } from 'react-cookie';
import { fetch } from '../_helpers';

const cookie = new Cookies();

export function logoutRequest() {
    return fetch(`${config.apiUrl}/auth/logout`, {
            method: 'GET'
        })
        .then(() => {
            cookie.set('access_token', '', { path: '/' });
            cookie.set('refresh_token', '', { path: '/' });
        });
}

export function getProfileRequest() {
    return fetch(`${config.apiUrl}/user/yourself`, {
        method: 'GET'
    }).then(response => {
        return response.body;
    });
}

export function updateProfileRequest(profile) {
    return fetch(`${config.apiUrl}/user/yourself`, {
        method: 'POST',
        body: JSON.stringify(profile),
    }).then(response => {
        return response.body;
    })
}