import { alertActions } from './';
import { userConstants } from '../_constants';
import { history, i18n } from '../_helpers';
import { userService } from '../_services';

export const userActions = {
    login,
    register
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                token => {
                    dispatch(success(token));
                    history.push('/');
                    dispatch(alertActions.success(i18n.t('Successfully logged in.')));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
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
