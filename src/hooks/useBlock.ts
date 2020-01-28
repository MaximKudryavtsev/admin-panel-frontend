import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IBlock, IDictionary } from "../entities";
import { createBlock, fetchBlockTypes } from "../api";

export function useBlock(
    pageId: string,
): {
    blockTypes: IDictionary[];
} {
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const [blockTypes, setBlockTypes] = useState<IDictionary[]>([]);
    const [blocks, setBlock] = useState<IBlock<any>[]>([]);

    const fetchTypes = useCallback(() => {
        fetchBlockTypes(transport).then((response) => setBlockTypes(response.data));
    }, [transport]);

    const create = useCallback((type: string) => {
        return createBlock(transport, {pageId, type});
    }, [transport, pageId]);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    return { blockTypes };
}
