import { IContact } from "./contact";
import { TLang } from "./lang";

export interface IFooter {
    _id: string;
    copyright: string;
    lang: TLang;
    contacts?: IContact[];
    buttonTitle?: string;
    buttonLink?: string;
    navigationTypeId?: string;
}
