import { IUpdateAvatar, IChangePasswordData, IUser, TResponse } from "../entities";
import { useCallback, useEffect, useState } from "react";
import { Transport } from "../transport";
import { ProfileAPI } from "../api";

export function useProfile(transport: Transport): {
    user?: IUser;
    fetchOne: () => Promise<void>;
    updateUser: (user: Partial<IUser>) => Promise<void>;
    deleteUser: () => Promise<TResponse<void>>;
    updatePassword: (data: IChangePasswordData) => Promise<TResponse<void>>;
    updateAvatar: (data: IUpdateAvatar) => Promise<void>;
    deleteAvatar: () => Promise<void>;
} {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const fetchOne = useCallback(
        () =>
            ProfileAPI.fetchProfile(transport)
                .then((response) => setUser(response.data))
                .catch(console.error),
        [transport, setUser],
    );

    const update = useCallback(
        (user: Partial<IUser>) => {
            return ProfileAPI.updateProfile(transport, user).then((response) => setUser(response.data));
        },
        [transport, setUser],
    );

    const delUser = useCallback(() => {
        return ProfileAPI.deleteProfile(transport);
    }, [transport]);

    const updatePass = useCallback(
        (data: IChangePasswordData) => {
            return ProfileAPI.updatePassword(transport, data);
        },
        [transport],
    );

    const onUpdateAvatar = useCallback(
        (data: IUpdateAvatar) => {
            return ProfileAPI.updateAvatar(transport, transport.formatToFormData(data)).then(fetchOne);
        },
        [transport, fetchOne],
    );

    const onDeleteAvatar = useCallback(() => {
        return ProfileAPI.deleteAvatar(transport).then((response) => setUser(response.data));
    }, [transport]);

    useEffect(() => {
        fetchOne();
    }, [fetchOne]);

    return {
        user,
        fetchOne,
        updateUser: update,
        deleteUser: delUser,
        updatePassword: updatePass,
        updateAvatar: onUpdateAvatar,
        deleteAvatar: onDeleteAvatar
    };
}
