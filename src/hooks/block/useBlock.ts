import { useCallback, useEffect, useState } from "react";
import { Transport } from "../../transport";
import { IBlock, IDictionary } from "../../entities";
import { BlockAPI } from "../../api";

export function useBlock(
    transport: Transport,
    pageId: string,
): {
    blockTypes: IDictionary[];
    blocks: IBlock<any>[];
    createBlock: (type: string) => Promise<void>;
    deleteBlock: (id: string) => Promise<void>;
    updateBlock: (id: string, data: IBlock<any>) => Promise<void>;
} {
    const [blockTypes, setBlockTypes] = useState<IDictionary[]>([]);
    const [blocks, setBlocks] = useState<IBlock<any>[]>([]);

    const fetchTypes = useCallback(() => {
        BlockAPI.fetchBlockTypes(transport, pageId).then((response) => setBlockTypes(response.data));
    }, [transport, pageId]);

    const fetchList = useCallback(() => {
        BlockAPI.fetchBlocks(transport, pageId).then((response) => setBlocks(response.data));
    }, [transport, pageId]);

    const create = useCallback((type: string) => {
        return BlockAPI.createBlock(transport, {pageId, type}).then((response) => setBlocks(response.data));
    }, [transport, pageId]);

    const handleDeleteBlock = useCallback((id: string) => {
        return BlockAPI.deleteBlock(transport, id).then(fetchList);
    }, [transport, fetchList]);

    const update = useCallback((id: string, data: IBlock<any>) => {
        return BlockAPI.updateBlock(transport, id, transport.formatToFormData(data)).then(fetchList);
    }, [transport, fetchList]);

    useEffect(() => {
        fetchTypes();
        fetchList();
    }, [fetchTypes, fetchList]);

    return { blockTypes, createBlock: create, blocks, deleteBlock: handleDeleteBlock, updateBlock: update };
}
