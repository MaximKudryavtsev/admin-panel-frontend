import {Transport } from "../transport";
import { IUpdateUserPassword, IUser } from "../entities";
import { ApiPaths } from "../config";

export function fetchUser(transport: Transport) {
    return transport.get<IUser>(ApiPaths.GET_USER);
}

export function updateUser(transport: Transport, user: Partial<IUser>) {
    return transport.put<Partial<IUser>, IUser>(ApiPaths.UPDATE_USER, user);
}

export function updatePassword(transport: Transport, data: IUpdateUserPassword) {
    return transport.put<IUpdateUserPassword, void>(ApiPaths.UPDATE_PASSWORD, data);
}

export function deleteUser(transport: Transport) {
    return transport.delete(ApiPaths.DELETE_USER);
}

export function updateAvatar(transport: Transport, data: FormData) {
    return transport.put<FormData, IUser>(ApiPaths.UPDATE_AVATAR, data);
}

export function deleteAvatar(transport: Transport) {
    return transport.delete<IUser>(ApiPaths.DELETE_AVATAR);
}
