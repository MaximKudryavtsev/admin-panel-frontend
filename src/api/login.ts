import { Transport } from "../transport";
import { ILogin, IToken, IUser } from "../entities";
import { ApiPaths } from "../config";

export function signIn(transport: Transport, data: ILogin) {
    return transport.post<ILogin, IToken>(ApiPaths.SIGN_IN, data);
}

export function login(transport: Transport) {
    return transport.post<{}, IUser>(ApiPaths.AUTH);
}
