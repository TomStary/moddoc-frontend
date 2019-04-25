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