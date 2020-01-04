import { IUpdateAvatar, IUpdateUserPassword, IUser, TResponse } from "../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { deleteAvatar, deleteUser, fetchUser, updateAvatar, updatePassword, updateUser } from "../api";

export function useUser(): {
    user: IUser | null;
    fetchOne: () => Promise<void>;
    updateUser: (user: IUser) => Promise<void>;
    deleteUser: () => Promise<TResponse<void>>;
    updatePassword: (data: IUpdateUserPassword) => Promise<TResponse<void>>;
    updateAvatar: (data: IUpdateAvatar) => Promise<void>;
    deleteAvatar: () => Promise<void>;
} {
    const [user, setUser] = useState<IUser | null>(null);
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const fetchOne = useCallback(
        () =>
            fetchUser(transport)
                .then((response) => setUser(response.data))
                .catch(console.error),
        [transport, setUser],
    );

    const update = useCallback(
        (user: IUser) => {
            return updateUser(transport, user).then((response) => setUser(response.data));
        },
        [transport, setUser],
    );

    const delUser = useCallback(() => {
        return deleteUser(transport);
    }, [transport]);

    const updatePass = useCallback(
        (data: IUpdateUserPassword) => {
            return updatePassword(transport, data);
        },
        [transport],
    );

    const onUpdateAvatar = useCallback(
        (data: IUpdateAvatar) => {
            return updateAvatar(transport, transport.formatToFormData(data)).then((response) =>
                setUser(response.data),
            );
        },
        [transport],
    );

    const onDeleteAvatar = useCallback(() => {
        return deleteAvatar(transport).then((response) => setUser(response.data));
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
