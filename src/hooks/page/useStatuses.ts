import { IDictionary } from "../../entities";
import { useCallback, useEffect, useState } from "react";
import { Transport } from "../../transport";
import { PageAPI } from "../../api";

export function useStatuses(transport: Transport): {
    statuses: IDictionary[];
} {
    const [statuses, setStatuses] = useState<IDictionary[]>([]);

    const getStatuses = useCallback(() => {
        PageAPI.fetchPageStatusList(transport).then((response) =>
            setStatuses(response.data),
        );
    }, [transport]);

    useEffect(() => {
        getStatuses();
    }, []);

    return { statuses };
}
