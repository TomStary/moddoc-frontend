import config from 'config';

import { fetch } from '../_helpers';

export function getDocuments() {
    return fetch(`${config.apiUrl}/document`, {
        method: 'GET',
    })
    .then(response => {
        return response.body;
    });
}

export function createOrUpdateDocument(data) {
    return fetch(`${config.apiUrl}/document`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.body;
    });
}

export function loadDocumentById(documentId) {
    return fetch(`${config.apiUrl}/document/${documentId}`, {
        method: 'GET',
    })
    .then(response => {
        return response.body;
    });
}