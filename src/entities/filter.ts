import { IDictionary, IIdResponse } from "./common";

export interface IFilter extends IIdResponse {
    title: string;
    filters: IDictionary[];
}
