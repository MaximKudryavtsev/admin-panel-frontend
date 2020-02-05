import { TLang } from "./lang";
import { IDictionary } from "./common";

export interface IContact {
    _id: string;
    typeId: string;
    type: IDictionary;
    title: string;
    value?: string;
    lang: TLang;
}

export enum EContactTypes {
    EMAIL = "email",
    PHONE = "phone"
}
