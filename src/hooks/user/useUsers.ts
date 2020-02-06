import { Transport } from "../../transport";
import { IIdResponse, IUser, TResponse } from "../../entities";
import { useCallback, useEffect, useState } from "react";
import { UsersAPI } from "../../api";

export function useUsers(transport: Transport): {
    users: IUser[];
    user: IUser | undefined;
    getUser: (id: string) => Promise<void>;
    createUser: (data: Partial<IUser>) => Promise<TResponse<IIdResponse>>;
} {
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const getList = useCallback(() => {
        UsersAPI.fetchUsers(transport).then((response) => setUsers(response.data));
    }, [transport]);

    const getUser = useCallback((id: string) => {
        return UsersAPI.fetchUser(transport, id).then((response) => setUser(response.data));
    }, [transport]);

    const createUser = useCallback((data: Partial<IUser>) => {
        return UsersAPI.createUser(transport, data);
    }, [transport]);

    useEffect(() => {
        getList();
    }, [getList]);

    return {user, users, createUser, getUser}
}
