import { push } from 'connected-react-router';

import { modulesConstants, alertConstants } from '../_constants';
import { getModulesByRepositoryId,
    createOrUpdateModulePost,
    loadModuleById } from '../_services';
import { processError } from '../_helpers';

export const modulesActions = {
    getAllModulesForRepository,
    createModule,
    loadModule,
};

function getAllModulesForRepository(repositoryId) {
    return function(dispatch) {
        getModulesByRepositoryId(repositoryId).
            then(reponse => {
                const modules = reponse;
                dispatch({type: modulesConstants.MODULES_LOADED, modules});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({type: modulesConstants.MODULES_FAILED, error});
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            });
    };
}

function createModule(data) {
    return function(dispatch) {
        createOrUpdateModulePost(data)
            .then(reponse => {
                dispatch(push(`/module/${reponse.id}`));
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
            });
    };
}

function loadModule(moduleId) {
    return function(dispatch) {
        loadModuleById(moduleId)
            .then(response =>  {
                const module = response;
                dispatch({type: modulesConstants.MODULE_LOADED, module});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({type: modulesConstants.MODULE_FAILED, error});
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            })
    }
}
