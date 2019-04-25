import config from 'config';

import { fetch } from '../_helpers';

export function getAllRepositories() {
    return fetch(`${config.apiUrl}/repository`, {
            method: 'GET',
        })
        .then(response => {
            return response.body;
        });
}

export function getRepositoryById(id) {
    return fetch(`${config.apiUrl}/repository/${id}`, {
        method: 'GET',
    })
    .then(response => {
        return response.body;
    })
}

export function postRepository(data) {
    return fetch(`${config.apiUrl}/repository`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.body;
    })
}
