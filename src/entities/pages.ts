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
    updatedAt: string;
}
