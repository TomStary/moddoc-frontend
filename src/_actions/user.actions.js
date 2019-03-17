import { userConstants } from '../_constants'

export const userActions = {
    login,
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
    };
}