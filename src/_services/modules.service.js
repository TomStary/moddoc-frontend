import config from 'config';

import { fetch } from '../_helpers';

export function getModulesByRepositoryId(id) {
    return fetch(`${config.apiUrl}/module/all/${id}`, {
        method: 'GET'
    })
    .then(response => {
        return response.body;
    });
}

export function createOrUpdateModulePost(data) {
    return fetch(`${config.apiUrl}/module`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.body;
    });
}

export function loadModuleById(id) {
    return fetch(`${config.apiUrl}/module/${id}`, {
        method: 'GET',
    })
    .then(response => {
        return response.body;
    });
}
