import { modulesConstants } from '../_constants';
import { getModulesByRepositoryId } from '../_services';

export const modulesActions = {
    getAllModulesForRepository,
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