import {Transport } from "../transport";
import { IChangePasswordData, IUser } from "../entities";
import { ApiPaths } from "../config";

export function fetchProfile(transport: Transport) {
    return transport.get<IUser>(ApiPaths.PROFILE);
}

export function updateProfile(transport: Transport, user: Partial<IUser>) {
    return transport.put<Partial<IUser>, IUser>(ApiPaths.PROFILE, user);
}

export function updatePassword(transport: Transport, data: IChangePasswordData) {
    return transport.put<IChangePasswordData, void>(ApiPaths.PROFILE_PASSWORD, data);
}

export function deleteProfile(transport: Transport) {
    return transport.delete(ApiPaths.PROFILE);
}

export function updateAvatar(transport: Transport, data: FormData) {
    return transport.put<FormData, void>(ApiPaths.PROFILE_AVATAR, data);
}

export function deleteAvatar(transport: Transport) {
    return transport.delete<IUser>(ApiPaths.PROFILE_AVATAR);
}
