import axios from "axios";
import { host } from "../config";
import { AxiosRequestConfig } from "axios";
import { IToken, TResponse } from "../entities";
import { mapValues, isString } from "lodash";

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
        const response = await this.instance.post(url, data, this.config(params));
        return response.data;
    }

    async put<Request, Response>(
        url: string,
        data: Request,
        params?: object,
    ): Promise<TResponse<Response>> {
        const response = await this.instance.put(url, data, this.config(params));
        return response.data;
    }

    async delete<Response = void>(url: string, params?: object): Promise<TResponse<Response>> {
        const response = await this.instance.delete(url, this.config(params));
        return response.data;
    }

    setToken(token: IToken): void {
        this.token = token;
        localStorage.setItem("token", JSON.stringify(token));
    }

    formatToFormData(params: {}): FormData {
        const formData = new FormData();
        mapValues(params, (value: string | File, key) => {
            const isFile = !isString(value) && (value as {}) instanceof File;
            if (!isFile && !isString(value)) {
                return formData.append(key, JSON.stringify(value));
            }
            formData.append(key, value);
        });
        return formData;
    }

    private config(params?: object): TransportConfig {
        return {
            baseURL: host.LOCAL,
            headers: {
                ...this.headers,
                ...this.token,
                "Content-Type": "application/json",
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
