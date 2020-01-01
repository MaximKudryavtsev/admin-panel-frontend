import { Transport } from "../transport";
import { ILogin, IToken } from "../entities";

const transport = new Transport();

export function signIn(data: ILogin) {
    return transport.post<ILogin, IToken>("login/sign-in", data);
}
