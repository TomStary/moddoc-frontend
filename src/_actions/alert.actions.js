import { alertConstants } from '../_constants';

export const alertActions = {
    showNotification,
    hideNotification
};

function showNotification(notificationSource) {
    return { type: alertConstants.SHOW, notificationSource };
}

function hideNotification() {
    return { type: alertConstants.HIDE };
}