export * from './user.service';
export * from './documents.service';
export * from './modules.service';
export * from './repository.service';

export function createRequestOptions(data) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'same-origin',
    }
}