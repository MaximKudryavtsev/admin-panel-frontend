import { IDictionary } from "./common";

export enum EBlockTypes {
    FACTS = "facts",
    QUOTE = "quote",
    CONTACTS = "contacts",
    BLOG = "blog",
    DESCRIPTION = "description",
    BLUE_LINES_LIST = "blueLinesList",
    FEEDBACK = "feedbackBlock",
}

export interface ICreateBlockRequest {
    type: string;
    pageId: string;
}

export interface IBlock<T> {
    _id: string;
    pageId: string;
    type: IDictionary;
    status: IDictionary;
    statusId: string;
    open: boolean;
    position: number;
    data?: T;
}
