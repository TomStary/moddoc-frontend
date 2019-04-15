import { push } from 'connected-react-router';
import {
    userConstants,
    alertConstants
} from '../_constants';
import {
    i18n,
    loginRequest,
    processError,
    registerRequest
} from '../_helpers';
import { logoutRequest, getProfileRequest } from '../_services';
import { Cookies } from 'react-cookie';

export const userActions = {
    login,
    register,
    logout,
    getProfile,
    loginStatus
}

function login(values) {
    return function (dispatch) {
        loginRequest(values).
            then(response => {
                const user = {
                    username: response.username,
                };
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    user
                });
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

function loginStatus() {
    return function(dispatch) {
        const cookie = new Cookies();
        if (!cookie.get('access_token') || cookie.get('access_token') == '') {
            if (!cookie.get('refresh_token') || cookie.get('refresh_token') == '') {
                localStorage.removeItem('user');
                dispatch({type: userConstants.LOGOUT});
                dispatch(push('/login'));
            }
        }
    }
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
    return function(dispatch) {
        logoutRequest()
            .then(() => {
                    localStorage.removeItem('user');
                    dispatch({type: userConstants.LOGOUT});
                    dispatch(push('/login'));
                }
            )
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                })
            });
    }
}

function getProfile() {
    return function(dispatch) {
        getProfileRequest()
            .then(response => {
                const user = response;
                dispatch({type: userConstants.PROFILE_LOADED, user});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                })
            });
    }
}