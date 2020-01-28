export interface INavigationType {
    _id: string;
    title: string;
    label: string;
}

export interface INavigation {
    _id: string;
    title: string;
    parentId?: string;
    link?: string;
    position: number;
    navigationType?: string;
    isVisible: boolean;
    hasChild: boolean;
    lang: string;
    type: TypeNavigation;
}

export type TCreateNavigationRequest = Omit<INavigation, "_id" | "hasChild">;
export type TUpdateNavigationRequest = Partial<INavigation> & {_id: string};

export interface IClientNavigation {
    navigation: INavigation;
    children?: IClientNavigation[];
}

export interface INavigationOrder {
    _id: string;
    position: number;
    parentId?: string;
}

export type TypeNavigation = "navigation" | "footer";
export type TNavigationPage = Pick<INavigation, "_id" | "title">;

export enum ENavigationType {
    INTERNAL = "internalLink",
    EXTERNAL = "externalLink"
}
