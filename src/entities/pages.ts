import { IDictionary } from "./common";

export interface IPagesTableRow {
    _id: string;
    author: {
        _id: string;
        title: string;
    };
    title: string;
    status: IDictionary;
    createdAt: string;
    updatedAt: string;
}

export interface IPage extends IPagesTableRow {
    link?: string;
    statusId: string;
    footerVisible?: boolean;
    blocks?: Array<{
        type: string;
        data: any;
    }>
}

export interface ICreatePageRequest {
    title: string;
}

export interface ICreatePageResponse {
    _id: string;
}

export interface IPageAuthor {
    _id: string;
    title: string;
    avatar?: string;
}

export type TBuildPageRequest = { pageId: string };
