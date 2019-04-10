import merge from 'lodash/merge'

// fetchJSON is bundled wrapper around fetch which simplifies working
// with JSON API:
//   * Automatically adds Content-Type: application/json to request headers
//   * Parses response as JSON when Content-Type: application/json header is
//     present in response headers
//   * Converts non-ok responses to errors
import {
    configureRefreshFetch,
    fetchJSON
} from 'refresh-fetch'
import {
    Cookies
} from 'react-cookie';
import config from 'config';
import { func } from 'prop-types';

const cookie = new Cookies();

const retrieveToken = () => cookie.get('access_token');
const saveToken = token => {
    cookie.set('access_token', token.access_token);
    cookie.set('refresh_token', token.refresh_token);
}
const clearToken = () => {
    cookie.set('access_token', '');
    cookie.set('refresh_token', '');
}

const fetchJSONWithToken = (url, options = {}) => {
    const token = retrieveToken()

    let optionsWithToken = options
    if (token != null) {
        optionsWithToken = merge({}, options, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return fetchJSON(url, optionsWithToken)
}

const loginRequest = (values) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'same-origin',
    }
    return fetchJSON(`${config.apiUrl}/auth/login`, options)
        .then(response => {
            saveToken(response.body);
            return response.body;
        });
}

const registerRequest = (values) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'same-origin',
    };
    return fetchJSON(`${config.apiUrl}/auth/registration`, options)
        .then(response => {
            return response.body;
        });
}

const shouldRefreshToken = error =>
    error.response.status === 401 &&
    error.body.message === 'Token has expired'

const refreshToken = () => {
    return fetchJSONWithToken(`${config.apiUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookie.get('refresh_token')}`
            }
        })
        .then(response => {
            saveToken(response.body.token)
        })
        .catch(error => {
            // Clear token and continue with the Promise catch chain
            clearToken()
            throw error
        })
}

const fetch = configureRefreshFetch({
    fetch: fetchJSONWithToken,
    shouldRefreshToken,
    refreshToken
})

const logout = () => {
    const token = retrieveToken();
    return fetch(`${config.apiUrl}/auth/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            clearToken()
        })
}

function processError(error) {
    if (!error.status) {
        return error.message;
    }
    if (error.status == 400) {
        console.log(error.body);
        if (error.body.error.message) {
            const errorM = error.body.error.message;
            return errorM;
        }
    }
    if (error.status == 422) {
        for (const value in error.body) {
            return (error.body[value])[0];
        }
    }
    const errorM = error.body.error[0].message;
    return errorM;
}

export {
    fetch,
    loginRequest,
    logout,
    processError,
    registerRequest,
}