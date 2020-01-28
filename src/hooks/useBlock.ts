import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IDictionary } from "../entities";
import { fetchBlockTypes } from "../api";

export function useBlock(
    pageId: string,
): {
    blockTypes: IDictionary[];
} {
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const [blockTypes, setBlockTypes] = useState<IDictionary[]>([]);

    const fetchTypes = useCallback(() => {
        fetchBlockTypes(transport).then((response) => setBlockTypes(response.data));
    }, [transport]);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    return { blockTypes };
}
