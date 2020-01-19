import { Transport } from "../transport";
import {
    INavigation,
    INavigationOrder,
    INavigationType,
    TCreateNavigationRequest,
    TLang, TUpdateNavigationRequest,
} from "../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createNavigation,
    deleteNavigation,
    getNavigation,
    getNavigationList,
    getNavigationTypes,
    reorderNavigations,
    updateNavigation,
} from "../api";

export function useNavigation(
    lang: TLang,
): {
    navigationTypes: INavigationType[];
    navigations: INavigation[];
    navigation?: INavigation;
    getNavigation: (id: string) => Promise<void>;
    createNavigation: (navigation: TCreateNavigationRequest) => Promise<void>;
    updateNavigation: (navigation: TUpdateNavigationRequest) => Promise<void>;
    deleteNavigation: (id: string) => Promise<void>;
    reorderNavigation: (order: INavigationOrder) => Promise<void>;
} {
    const [navigationTypes, setNavigationTypes] = useState<INavigationType[]>([]);
    const [navigations, setNavigations] = useState<INavigation[]>([]);
    const [navigation, setNavigation] = useState<INavigation | undefined>(undefined);

    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getTypes = useCallback(() => {
        return getNavigationTypes(transport).then((response) => setNavigationTypes(response.data));
    }, [transport]);

    const getList = useCallback(() => {
        return getNavigationList(transport, lang).then((response) => setNavigations(response.data));
    }, [transport, lang]);

    const get = useCallback(
        (id: string) => {
            return getNavigation(transport, id).then((response) => setNavigation(response.data));
        },
        [transport],
    );

    const create = useCallback(
        (navigation: TCreateNavigationRequest) => {
            return createNavigation(transport, navigation, lang).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, lang],
    );

    const update = useCallback(
        (navigation: TUpdateNavigationRequest) => {
            return updateNavigation(transport, navigation._id, navigation).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport],
    );

    const onDeleteNavigation = useCallback(
        (id: string) => {
            return deleteNavigation(transport, id, lang).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, lang],
    );

    const reorder = useCallback(
        (order: INavigationOrder) => {
            return reorderNavigations(transport, order, lang).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, lang],
    );

    useEffect(() => {
        getTypes();
        getList();
    }, [getTypes, getList]);

    return {
        navigationTypes,
        navigations,
        navigation,
        getNavigation: get,
        createNavigation: create,
        updateNavigation: update,
        deleteNavigation: onDeleteNavigation,
        reorderNavigation: reorder,
    };
}
