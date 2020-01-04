import { Transport } from "../transport";
import { ILogin, IToken } from "../entities";
import { ApiPaths } from "../config";

export function signIn(transport: Transport, data: ILogin) {
    return transport.post<ILogin, IToken>(ApiPaths.SIGN_IN, data);
}

export function forgotPassword(transport: Transport, data: {email: string}) {
    return transport.post<{email: string}, string>(ApiPaths.FORGOT_PASSWORD, data);
}
