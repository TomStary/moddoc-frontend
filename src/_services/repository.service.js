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