import { TLang } from "./lang";

export interface IContact {
    _id: string;
    typeId: string;
    title: string;
    value?: string;
    open?: boolean;
    lang: TLang;
}

export enum EContactTypes {
    EMAIL = "email",
    PHONE = "phone"
}
