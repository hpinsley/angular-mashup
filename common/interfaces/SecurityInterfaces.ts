export interface IRole {
    name: string;
    description: string;
}

export interface IUser {
	userId: number;
	username: string;
	emailAddress:string;
	firstName:string;
	lastName:string;
    roles: string[];
}

export interface ILoginAudit {
    ip: string;
}

export interface IRegistrationAudit {
    firstName: string;
    lastName: string;
}

export interface IChatMessageAudit {
    message: string;
    messageTime: Date;
    clientsOnline: number;
}

export interface IRequestAudit {
    verb: string;
    url: string;
}

export type AuditDetails = ILoginAudit | IRegistrationAudit | IChatMessageAudit | IRequestAudit;

export interface IAuditRecord {
    username: string;
    time: Date;
    recType: string;
    details: AuditDetails;
}
