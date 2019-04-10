import { alertConstants } from '../_constants';

export const alertActions = {
    showNotification,
    hideNotification
};

function showNotification(notification) {
    return { type: alertConstants.SHOW, notification };
}

function hideNotification() {
    return { type: alertConstants.HIDE };
}