export interface INavigationType {
    _id: string;
    title: string;
    label: string;
}

export interface INavigation {
    _id: string;
    title: string;
    parentId?: string;
    link: string;
    position: number;
    navigationType: INavigationType;
    isVisible: boolean;
    hasChild: boolean;
    lang: string;
}

export type TCreateNavigationRequest = Omit<INavigation, "_id" | "hasChild">;
export type TUpdateNavigationRequest = Partial<INavigation> & {_id: string};

export interface INavigationOrder {
    _id: string;
    position: number;
}
