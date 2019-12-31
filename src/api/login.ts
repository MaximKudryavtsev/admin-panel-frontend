import { Transport } from "../transport";
import { ILogin } from "../entities";

const transport = new Transport();

export function signIn(data: ILogin) {
    return transport.post<ILogin, void>("login/sign-in", data);
}
