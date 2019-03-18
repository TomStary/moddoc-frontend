import config from 'config'

export const userService = {
    login,
};

function login(username, password) {
    let data = {
        username: username,
        password: password,
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'same-origin'
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            const error = data.error[0].message;
            return Promise.reject(error);
        }

        return data;
    })
}
