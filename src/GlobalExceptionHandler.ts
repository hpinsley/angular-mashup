import {ExceptionHandler} from 'angular2/core';
import {Response} from 'angular2/http';

export class GlobalExceptionHandler extends ExceptionHandler {

    call(error, stackTrace = null, reason = null) {
        if (error._body && error.status) {
            this.logHttpError(error, stackTrace, reason);
        } else {
            this.logGeneralError(error, stackTrace, reason);
        }
    }

    logHttpError(response:Response, stackTrace, reason) {
        if (response.status === 401) {
            alert(`You are not authorized to perform this operation.  Reason: ${reason}. Please log in or register.`);
        } else {
            this.logGeneralError(response, stackTrace, reason);
        }
    }

    logGeneralError(error, stackTrace, reason) {
        alert('error:' + error + ' stackTrace: ' + stackTrace + ' reason: ' + reason);
    }
}
