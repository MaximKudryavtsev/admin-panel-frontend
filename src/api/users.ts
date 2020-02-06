import { Transport } from "../transport";
import { IIdResponse, IUser } from "../entities";
import { ApiPaths } from "../config";

export function fetchUsers(transport: Transport) {
    return transport.get<IUser[]>(ApiPaths.USERS);
}

export function createUser(transport: Transport, data: Partial<IUser>) {
    return transport.post<Partial<IUser>, IIdResponse>(ApiPaths.USERS, data);
}

export function fetchUser(transport: Transport, id: string) {
    return transport.get<IUser>(`${ApiPaths.USERS}/${id}`);
}
