export interface IPagesTableRow {
    _id: string;
    author: {
        _id: string;
        title: string;
    };
    title: string;
    status: {
        _id: string;
        title: string;
    };
    cratedAt: string;
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
