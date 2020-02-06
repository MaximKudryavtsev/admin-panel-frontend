import { Transport } from "../transport";
import { IDictionary, IIdResponse, IUser, TCreateUserRequest } from "../entities";
import { ApiPaths } from "../config";

export function fetchUsers(transport: Transport) {
    return transport.get<IUser[]>(ApiPaths.USERS);
}

export function createUser(transport: Transport, data: TCreateUserRequest) {
    return transport.post<TCreateUserRequest, IIdResponse>(ApiPaths.USERS, data);
}

export function fetchUser(transport: Transport, id: string) {
    return transport.get<IUser>(`${ApiPaths.USERS}/${id}`);
}

export function fetchRoles(transport: Transport) {
    return transport.get<IDictionary[]>(`${ApiPaths.USERS}/roles`)
}
