import { alertConstants, documentsConstants } from '../_constants';
import { getDocuments,
    createOrUpdateDocument,
    loadDocumentById
} from '../_services';
import { push } from 'connected-react-router';

export const documentsActions = {
    getAllDocuments,
    createDocument,
    loadDocument,
};

function getAllDocuments() {
    return function(dispatch) {
        getDocuments()
            .then(response => {
                const documents = response;
                dispatch({type: documentsConstants.DOCUMENTS_LOADED, documents});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({type: documentsConstants.DOCUMENTS_FAILED, error});
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            });
    }
}

function loadDocument(documentId) {
    return function(dispatch) {
        loadDocumentById(documentId)
            .then(response =>  {
                const document = response;
                dispatch({type: documentsConstants.DOCUMENT_LOADED, document});
            })
            .catch(error => {
                const notification = {
                    level: 'danger',
                    message: processError(error),
                };
                dispatch({type: documentsConstants.DOCUMENT_FAILED, error});
                dispatch({
                    type: alertConstants.SHOW,
                    notification
                });
            })
    }
}

function createDocument(data) {
    return function(dispatch) {
        createOrUpdateDocument(data)
            .then(response => {
                dispatch(push(`/document/${response.id}`));
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
    }
}