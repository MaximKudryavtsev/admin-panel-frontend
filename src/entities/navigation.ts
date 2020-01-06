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

export interface INavigationOrder {
    _id: string;
    position: number;
}
