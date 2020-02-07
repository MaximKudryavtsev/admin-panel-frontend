import { Transport } from "../transport";
import {
    IDictionary,
    INavigation,
    INavigationOrder,
    TCreateNavigationRequest,
    TLang, TNavigationPage, TUpdateNavigationRequest, TypeNavigation,
} from "../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createNavigation,
    deleteNavigation, fetchNavigationPages,
    getNavigation,
    getNavigationList,
    getNavigationTypes,
    reorderNavigations,
    updateNavigation,
} from "../api";

export function useNavigation(
    lang: TLang,
    type: TypeNavigation = "navigation"
): {
    navigationTypes: IDictionary[];
    navigations: INavigation[];
    navigation?: INavigation;
    getNavigation: (id: string) => Promise<void>;
    createNavigation: (navigation: TCreateNavigationRequest) => Promise<void>;
    updateNavigation: (navigation: TUpdateNavigationRequest) => Promise<void>;
    deleteNavigation: (id: string) => Promise<void>;
    reorderNavigation: (order: INavigationOrder) => Promise<void>;
    navigationsPages: TNavigationPage[];
} {
    const [navigationTypes, setNavigationTypes] = useState<IDictionary[]>([]);
    const [navigations, setNavigations] = useState<INavigation[]>([]);
    const [navigation, setNavigation] = useState<INavigation | undefined>(undefined);
    const [pages, setPages] = useState<TNavigationPage[]>([]);

    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getTypes = useCallback(() => {
        return getNavigationTypes(transport).then((response) => setNavigationTypes(response.data));
    }, [transport]);

    const getList = useCallback(() => {
        return getNavigationList(transport, lang, type).then((response) => setNavigations(response.data));
    }, [transport, type, lang]);

    const get = useCallback(
        (id: string) => {
            return getNavigation(transport, id, lang).then((response) => setNavigation(response.data));
        },
        [transport, lang],
    );

    const create = useCallback(
        (navigation: TCreateNavigationRequest) => {
            return createNavigation(transport, navigation, lang, type).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, type, lang],
    );

    const update = useCallback(
        (navigation: TUpdateNavigationRequest) => {
            return updateNavigation(transport, navigation._id, navigation, lang).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, lang],
    );

    const onDeleteNavigation = useCallback(
        (id: string) => {
            return deleteNavigation(transport, id, lang, type).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, type, lang],
    );

    const reorder = useCallback(
        (order: INavigationOrder) => {
            return reorderNavigations(transport, order, lang, type).then((response) =>
                setNavigations(response.data),
            );
        },
        [transport, type, lang],
    );

    const fetchPages = useCallback(() => {
        return fetchNavigationPages(transport, lang).then((response) => setPages(response.data));
    }, [lang, transport]);

    useEffect(() => {
        getTypes();
        getList();
        fetchPages();
    }, [getTypes, getList, fetchPages]);

    return {
        navigationTypes,
        navigations,
        navigation,
        getNavigation: get,
        createNavigation: create,
        updateNavigation: update,
        deleteNavigation: onDeleteNavigation,
        reorderNavigation: reorder,
        navigationsPages: pages
    };
}
