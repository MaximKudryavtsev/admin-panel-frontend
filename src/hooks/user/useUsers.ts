import { Transport } from "../../transport";
import { IDictionary, IUser, TCreateUserRequest } from "../../entities";
import { useCallback, useEffect, useState } from "react";
import { UsersAPI } from "../../api";

export function useUsers(
    transport: Transport,
): {
    users: IUser[];
    user: IUser | undefined;
    roles: IDictionary[];
    getUser: (id: string) => Promise<void>;
    createUser: (data: TCreateUserRequest) => Promise<void>;
    updateRoles: (id: string, roles: string[]) => Promise<void>;
} {
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [roles, setRoles] = useState<IDictionary[]>([]);

    const getList = useCallback(() => {
        UsersAPI.fetchUsers(transport).then((response) => setUsers(response.data));
    }, [transport]);

    const getUser = useCallback(
        (id: string) => {
            return UsersAPI.fetchUser(transport, id).then((response) => setUser(response.data));
        },
        [transport],
    );

    const createUser = useCallback(
        (data: TCreateUserRequest) => {
            return UsersAPI.createUser(transport, data).then(getList);
        },
        [transport, getList],
    );

    const getRoles = useCallback(() => {
        UsersAPI.fetchRoles(transport).then((response) => setRoles(response.data));
    }, [transport]);

    const updateRoles = useCallback((id: string, roles: string[]) => {
        return UsersAPI.updateRoles(transport, id, roles).then(getList);
    }, [transport]);

    useEffect(() => {
        getList();
        getRoles();
    }, [getList, getRoles]);

    return { user, users, createUser, getUser, roles, updateRoles };
}
