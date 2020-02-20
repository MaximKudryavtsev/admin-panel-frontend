import { IDictionary, IIdResponse } from "./common";
import { IBlock } from "./block";
import { INavigation } from "./navigation";
import { IContact } from "./contact";

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
    keyWords?: string;
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

export interface IClientPageBody extends IIdResponse {
    title: string;
    link: string;
    pageId: string;
    body: Pick<IBlock<any>, "type" | "data">[];
}

export interface IClientFooter {
    navigations: INavigation[];
    contacts?: IContact[];
    copyright: string;
    buttonTitle?: string;
    buttonLink?: string;
}

export interface IClientHeader {
    navigations: INavigation[];
    logoLink?: string;
    buttonTitle: string;
    buttonLink: string;
}

export enum EPageType {
    ORDINARY = "ordinary",
    CASE = "case"
}
