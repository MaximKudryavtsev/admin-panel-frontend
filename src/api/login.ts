import { Transport } from "../transport";
import { ILogin, IToken, IUser } from "../entities";

export function signIn(transport: Transport, data: ILogin) {
    return transport.post<ILogin, IToken>("login/sign-in", data);
}

export function login(transport: Transport) {
    return transport.post<{}, IUser>("login/auth")
}
