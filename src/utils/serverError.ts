import { IServerError, TServerError } from "../entities";
import { AxiosError, AxiosResponse } from "axios";

export function getServerError(error: AxiosError): IServerError | undefined {
    const response = error.response as AxiosResponse<TServerError>;
    if (!response) {
        return undefined;
    }
    return response.data.error;
}
