import { push } from 'connected-react-router';

import { processError } from '../_helpers';
import { repositoriesConstants, alertConstants } from '../_constants';
import { getAllRepositories, postRepository } from '../_services';

export const repositoryActions = {
    getRepositories,
    createOrUpdateRepository,
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

function createOrUpdateRepository(values) {
    return function(dispatch) {
        postRepository(values)
            .then(response => {
                const repository = response;
                dispatch({type: repositoriesConstants.REPOSITORY_LOADED, repository});
                dispatch(push(`/repository/${repository['id']}`))
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            })
    }
}