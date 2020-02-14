import { Transport } from "../transport";
import { IFilter, TCreateFilterRequest, TLang } from "../entities";
import { useCallback, useEffect, useState } from "react";
import { FilterAPI } from "../api";

export function useFilter(
    transport: Transport,
    lang: TLang,
): {
    filters: IFilter[];
    filter: IFilter | undefined;
    getFilter: (id: string) => Promise<void>;
    createFilter: (data: TCreateFilterRequest) => Promise<void>;
    updateFilter: (id: string, data: Partial<IFilter>) => Promise<void>;
    deleteFilter: (id: string) => Promise<void>;
} {
    const [filters, setFilters] = useState<IFilter[]>([]);
    const [filter, setFilter] = useState<IFilter | undefined>(undefined);

    const getList = useCallback(() => {
        FilterAPI.fetchAllFilters(transport, lang).then((response) => setFilters(response.data));
    }, [transport, lang]);

    const getFilter = useCallback(
        (id: string) => {
            return FilterAPI.fetchFilter(transport, id).then((response) =>
                setFilter(response.data),
            );
        },
        [transport],
    );

    const createFilter = useCallback(
        (data: TCreateFilterRequest) => {
            return FilterAPI.creatFilter(transport, data).then(getList);
        },
        [transport, getList],
    );

    const updateFilter = useCallback(
        (id: string, data: Partial<IFilter>) => {
            return FilterAPI.updateFilter(transport, id, data).then(getList);
        },
        [transport, getList],
    );

    const deleteFilter = useCallback(
        (id: string) => {
            return FilterAPI.deleteFilter(transport, id).then(getList);
        },
        [transport, getList],
    );

    useEffect(() => {
        getList();
    }, [getList]);

    return { filter, filters, getFilter, createFilter, deleteFilter, updateFilter };
}
