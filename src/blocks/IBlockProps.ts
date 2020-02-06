import { IBlock, IDictionary } from "../entities";

export interface IBlockProps<T = any> {
    block?: IBlock<T>;
    statuses?: IDictionary[];
    baseUrl?: string;

    onDelete?(id: string): void;

    onSubmit?(id: string, data: Partial<IBlock<T>>):Promise<void>;

    onOpenFullscreen?(): void;
}
