export class ActionNames {
    static Authenticate = 'AUTHENTICATE';
};

export interface ISecurityAction {
    type: string;
}

export interface IAuthenticateAction extends ISecurityAction {
    token: string;
}

export interface ISecurityState {
    token: string;
    authenticationTime?: Date;
}

export class SecurityReducer {

    static reducer(state:ISecurityState, action:ISecurityAction) : ISecurityState {

        if (state === undefined) {      // Undefined state.  Return initial state
            return {
                token: null
            };
        }

        switch(action.type) {

            case ActionNames.Authenticate:

                let authenticateAction = <IAuthenticateAction> action;

                return {
                    token: authenticateAction.token,
                    authenticationTime: new Date()
                };

            default:                        // Unknown action.  Don't change state
                return state;
        }
    }
}
