export interface IUser {
    _id: string;
    email: string;
    password: string;
    login?: string;
    avatar?: string;
    isBlocked?: boolean;
    isDeleted?: boolean;
}

export interface IUpdateUserPassword {
    password: string;
    newPassword: string;
}

export interface IUpdateAvatar {
    avatar: File;
}
