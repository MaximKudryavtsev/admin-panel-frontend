import axios from "axios";
import { host } from "../config";
import * as qs from "qs";

export class Transport {
    private readonly instance = axios.create({
        baseURL: host.LOCAL
    });

    async get<Response>(url: string, params?: object): Promise<Response> {
        const response = await this.instance.get(url, {params});
        return response.data;
    }

    async post<Request, Response>(url: string, data: Request): Promise<Response> {
        const response = await this.instance.post(url, qs.stringify(data));
        return response.data;
    }

    async put<Request, Response>(url: string, data: Request, params?: object): Promise<Response> {
        const response = await this.instance.put(url, qs.stringify(data), {params});
        return response.data;
    }

    async delete<Response = void>(url: string, params?: object): Promise<Response> {
        const response = await this.instance.delete(url, {params});
        return response.data;
    }
}
