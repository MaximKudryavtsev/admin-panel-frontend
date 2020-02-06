import { useCallback, useEffect, useState } from "react";
import { Transport } from "../../transport";
import { BlockAPI } from "../../api";
import { IBlock } from "../../entities";

export function useSingleBlock(transport: Transport, id: string,): {
    block: IBlock<any> | undefined;
    updateBlock: (data: Partial<IBlock<any>>) => Promise<void>;
} {
    const [block, setBlock] = useState<IBlock<any> | undefined>(undefined);

    const fetchOne = useCallback(() => {
        BlockAPI.fetchBlock(transport, id).then((response) => setBlock(response.data));
    }, [transport, id]);

    const update = useCallback((data: Partial<IBlock<any>>) => {
        return BlockAPI.updateBlock(transport, id, transport.formatToFormData(data)).then(fetchOne);
    }, [transport, id]);

    useEffect(() => {
        fetchOne();
    }, [fetchOne]);

    return { block, updateBlock: update };
}
