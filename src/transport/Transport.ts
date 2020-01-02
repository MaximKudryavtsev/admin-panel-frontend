import axios from "axios";
import { ApiPaths, host } from "../config";
import * as qs from "qs";
import { AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError } from "axios";
import { IServerError, IToken, TResponse, TServerError } from "../entities";
import { get, keys, includes } from "lodash";
import { AppContext } from "../context";

export type TransportConfig = Pick<AxiosRequestConfig, "headers" | "baseURL" | "params">;

export class Transport {
    private headers = {};
    private token?: IToken;

    private readonly instance = axios.create({
        baseURL: host.LOCAL,
    });

    async get<Response>(url: string, params?: object): Promise<TResponse<Response>> {
        const response = await this.instance.get(url, this.config(params));
        return response.data;
    }

    async post<Request, Response>(
        url: string,
        data?: Request,
        params?: object,
    ): Promise<TResponse<Response>> {
        const response = await this.instance.post(url, qs.stringify(data), this.config(params));
        return response.data
    }

    async put<Request, Response>(
        url: string,
        data: Request,
        params?: object,
    ): Promise<TResponse<Response>> {
        const response = await this.instance.put(url, qs.stringify(data), this.config(params));
        return response.data;
    }

    async delete<Response = void>(url: string, params?: object): Promise<TResponse<Response>> {
        const response = await this.instance.delete(url, this.config(params));
        return response.data;
    }

    private handleSeverError<T>(error: TServerError, request?: () => Promise<TResponse<T>>) {
        console.log(error);
    }

    setToken(token: IToken): void {
        this.token = token;
        localStorage.setItem("token", JSON.stringify(token));
    }

    private config(params?: object): TransportConfig {
        return {
            baseURL: host.LOCAL,
            headers: {
                ...this.headers,
                ...this.token,
                // "Content-Type": "application/json",
            },
            params,
        };
    }

    // private async reloginOnExpiration() {
    //     const tokenString = localStorage.getItem("token");
    //     if (!tokenString) {
    //         localStorage.removeItem("token");
    //         AppContext.getHistory().push("/sign-in");
    //         return;
    //     }
    //     const token: IToken = JSON.parse(tokenString);
    //     this.setToken(token);
    //     const update = await this.post<undefined, TResponse<IToken> | TServerError>(
    //         ApiPaths.UPDATE_TOKEN,
    //         undefined,
    //         this.config(),
    //     );
    //     if (update.success) {
    //         this.setToken((update.data as TResponse<IToken>).data);
    //     } else {
    //         localStorage.removeItem("token");
    //         AppContext.getHistory().push("/sign-in");
    //     }
    // }
}
