import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IDictionary } from "../entities";
import { getNavigationTypes } from "../api";

export function useNavigationTypes(): {
    navigationTypes: IDictionary[];
} {
    const transport = useMemo(() => Transport.create(), []);
    const [types, setTypes] = useState<IDictionary[]>([]);

    const getTypes = useCallback(() => {
        getNavigationTypes(transport).then((response) => setTypes(response.data));
    }, [transport]);

    useEffect(() => {
        getTypes();
    }, [getTypes]);

    return { navigationTypes: types };
}
