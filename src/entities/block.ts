import { IDictionary } from "./common";

export enum EBlockTypes {
    FACTS = "facts",
    QUOTE = "quote",
    CONTACTS = "contacts",
    BLOG = "blog",
    DESCRIPTION = "description",
    BLUE_LINES_LIST = "blueLinesList",
    FEEDBACK = "feedbackBlock",
    CLIENTS_LOGO = "clientsLogo",
    MAIN_ACHIEVEMENTS = "mainAchievements",
    BEST_ACHIEVEMENTS = "bestAchievements",
}

export interface ICreateBlockRequest {
    type: string;
    pageId: string;
}

export interface IBlock<T> {
    _id: string;
    pageId: string;
    type: IDictionary;
    status: IDictionary;
    statusId: string;
    open: boolean;
    position: number;
    data?: T;
}

export interface IImageBlockIItem {
    imageLink?: string;
    id: string;
    file?: File;
}

export type TImageBlockItem<T> = T extends IImageBlockIItem ? T : IImageBlockIItem;

export interface IImageBlock<T> {
    blocks: TImageBlockItem<T>[];
}

export type TImageBlock<T, P> = T extends IImageBlock<P> ? T : IImageBlock<P>;
