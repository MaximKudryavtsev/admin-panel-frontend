import { IDictionary } from "./common";

export interface IUser {
    _id: string;
    email: string;
    roles: IDictionary[];
    login?: string;
    avatar?: string;
    isBlocked?: boolean;
    isDeleted?: boolean;
    isBlockAvailable?: boolean;
    isDeleteAvailable?: boolean;
}

export interface IUpdateAvatar {
    avatar: File;
}

export interface IChangePasswordData {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
}

export type TCreateUserRequest = Pick<IUser, "email" | "_id"> & { roles: string[] };

export enum EUserRoles {
    SUPER_ADMIN = "superAdmin",
    RU = "ruAdmin",
    EN = "enAdmin"
}
