
import { processError } from '../_helpers';
import { repositoriesConstants, alertConstants } from '../_constants';
import { getAllRepositories } from '../_services';

export const repositoryActions = {
    getRepositories,
};

function getRepositories() {
    return function(dispatch) {
        getAllRepositories()
            .then(response => {
                const repositories = response;
                dispatch({type: repositoriesConstants.REPOSITORIES_LOADED, repositories});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({type: repositoriesConstants.REPOSITORIES_FAIL, error});
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            });
    }
}