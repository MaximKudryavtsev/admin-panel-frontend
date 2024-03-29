import { IDictionary, IIdResponse } from "./common";
import { TLang } from "./lang";

export interface IFilter extends IIdResponse {
    title: string;
    lang: TLang;
    authorId: string;
    filters: Omit<IDictionary, "label">[];
}

export interface IBuildedFilterBlock {
    filter: IFilter;
    blocks: Array<{
        title: string;
        description: string;
        visible: boolean;
        link: string;
        id: string;
        imageLink: string;
        filters: Omit<IDictionary, "label">[];
    }>
}

export type TCreateFilterRequest = Pick<IFilter, "title" | "lang"> & { filters: Array<{title: string}> };
export type TFilterList = Array<Pick<IFilter, "_id" | "title">>;
