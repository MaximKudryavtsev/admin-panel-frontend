export interface IUserRole {
    _id: string;
    title: string;
    label: string;
}

export interface IUser {
    _id: string;
    email: string;
    roles: IUserRole[];
    login?: string;
    avatar?: string;
    isBlocked?: boolean;
    isDeleted?: boolean;
    isBlockAvailable: boolean;
    isDeleteAvailable: boolean;
}

export interface IUpdateUserPassword {
    password: string;
    newPassword: string;
}

export interface IUpdateAvatar {
    avatar: File;
}
