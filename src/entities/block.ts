import { IDictionary } from "./common";

export interface ICreateBlockRequest {
    type: string;
    pageId: string;
}

export interface IBlock<T> {
    _id: string;
    pageId: string;
    type: IDictionary;
    statusId: string;
    data?: T;
}
