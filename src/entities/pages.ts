export interface IPageStatus {
    _id: string;
    title: string;
    label: string;
}

export interface IPagesTableRow {
    _id: string;
    author: {
        _id: string;
        title: string;
    };
    title: string;
    status: IPageStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IPage extends IPagesTableRow {
    link?: string;
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
