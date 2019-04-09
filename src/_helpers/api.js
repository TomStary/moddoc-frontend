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

const cookie = new Cookies();

// Provide your favorite token saving -- to cookies, local storage, ...
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

const login = (options) => {
    return fetchJSON(`${config.apiUrl}/auth/login`, options)
        .then(response => {
            saveToken(response.body);
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

export {
    fetch,
    login,
    logout
}