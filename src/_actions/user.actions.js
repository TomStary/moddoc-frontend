import { alertActions } from './';
import { userConstants } from '../_constants';
import { history, i18n, logout as LogoutR } from '../_helpers';
import { userService } from '../_services';

export const userActions = {
    login,
    register,
    logout
}

function login(username, password) {
    userService.login(username, password)
            .then(
                token => {
                    const localUser = {
                        username: token.username,
                    };
                    localStorage.setItem('user', JSON.stringify(localUser));
                    history.push('/');
                    return { type: userConstants.LOGIN_REQUEST, token };
                },
                error => {
                    return { type: userConstants.LOGIN_FAILURE, error };
                }
            );
}

function register(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                    dispatch(alertActions.success(i18n.t('Successfully logged in.')));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTRATION_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTRATION_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTRATION_ERROR, error } }
}


function logout() {
    return dispatch => {
        LogoutR()
            .then(
                () => {
                    localStorage.removeItem('user');
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success(i18n.t('Successfully logged out.')));
                },
            );
    };

    function success() { return { type: userConstants.LOGOUT } }
}
