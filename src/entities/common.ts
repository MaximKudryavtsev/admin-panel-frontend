export interface IDictionary {
    _id: string;
    title: string;
    label: string;
}

export enum EPageStatusLabel {
    DRAFT = "draft",
    PUBLISHED = "published"
}

export interface IIdResponse {
    _id: string;
}
