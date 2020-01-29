import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IBlock, IDictionary } from "../entities";
import { createBlock, deleteBlock, fetchBlocks, fetchBlockTypes, updateBlock } from "../api";

export function useBlock(
    pageId: string,
): {
    blockTypes: IDictionary[];
    blocks: IBlock<any>[];
    createBlock: (type: string) => Promise<void>;
    deleteBlock: (id: string) => Promise<void>;
    updateBlock: (id: string, data: IBlock<any>) => Promise<void>;
} {
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const [blockTypes, setBlockTypes] = useState<IDictionary[]>([]);
    const [blocks, setBlocks] = useState<IBlock<any>[]>([]);

    const fetchTypes = useCallback(() => {
        fetchBlockTypes(transport).then((response) => setBlockTypes(response.data));
    }, [transport]);

    const fetchList = useCallback(() => {
        fetchBlocks(transport, pageId).then((response) => setBlocks(response.data));
    }, [transport, pageId]);

    const create = useCallback((type: string) => {
        return createBlock(transport, {pageId, type}).then((response) => setBlocks(response.data));
    }, [transport, pageId]);

    const handleDeleteBlock = useCallback((id: string) => {
        return deleteBlock(transport, id).then(fetchList);
    }, [transport, fetchList]);

    const update = useCallback((id: string, data: IBlock<any>) => {
        return updateBlock(transport, id, data).then(fetchList);
    }, [transport]);

    useEffect(() => {
        fetchTypes();
        fetchList();
    }, [fetchTypes, fetchList]);

    return { blockTypes, createBlock: create, blocks, deleteBlock: handleDeleteBlock, updateBlock: update };
}
