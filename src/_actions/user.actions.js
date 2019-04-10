import {
    alertActions
} from './';
import {
    userConstants,
    alertConstants
} from '../_constants';
import {
    i18n,
    logout as LogoutR,
    loginRequest,
    processError,
    registerRequest
} from '../_helpers';
import {
    userService
} from '../_services';
import { push } from 'connected-react-router';

export const userActions = {
    login,
    register,
    logout
}

function login(values) {
    return function (dispatch) {
        loginRequest(values).
            then(response => {
                const localUser = {
                    username: response.username,
                };
                localStorage.setItem('user', JSON.stringify(localUser));
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    localUser
                });
                dispatch(push('/'));
            })
            .catch(error => {
                localStorage.removeItem('user');
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    error
                });
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                })
            });
    };
}

function register(user) {
    return function (dispatch) {
        registerRequest(user)
            .then(
                user => {
                    dispatch({
                        type: userConstants.REGISTRATION_SUCCESS,
                        user
                    });
                    const notification = {
                        level: "success",
                        message: i18n.t("Registration completed, you can now log to your account"),
                    }
                    dispatch({
                        type: alertConstants.SHOW,
                        notification
                    });
                    dispatch(push('/login'));
                })
            .catch(error => {
                dispatch({
                    type: userConstants.REGISTRATION_ERROR,
                    error
                });
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                })
            });
    };
}


function logout() {
    return dispatch => {
        LogoutR()
            .then(
                () => {
                    localStorage.removeItem('user');
                    dispatch(success());
                    dispatch(alertActions.success(i18n.t('Successfully logged out.')));
                },
            );
    };

    function success() {
        return {
            type: userConstants.LOGOUT
        }
    }
}