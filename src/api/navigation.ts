import { Transport } from "../transport";
import { INavigation, INavigationOrder, INavigationType, TCreateNavigationRequest, TLang } from "../entities";
import { ApiPaths } from "../config";

export function getNavigationTypes(transport: Transport) {
    return transport.get<INavigationType[]>(ApiPaths.GET_NAVIGATION_TYPES);
}

export function getNavigationList(transport: Transport, lang: TLang) {
    return transport.get<INavigation[]>(ApiPaths.GET_NAVIGATION_LIST, { lang });
}

export function getNavigation(transport: Transport, id: string) {
    return transport.get<INavigation>(ApiPaths.GET_NAVIGATION.replace(":id", id));
}

export function updateNavigation(transport: Transport, id: string, navigation: Partial<INavigation>) {
    return transport.put<Partial<INavigation>, INavigation[]>(
        ApiPaths.UPDATE_NAVIGATION.replace(":id", id),
        navigation,
    );
}

export function createNavigation(transport: Transport, navigation: TCreateNavigationRequest, lang: TLang) {
    return transport.post<TCreateNavigationRequest, INavigation[]>(ApiPaths.CREATE_NAVIGATION, navigation, {
        lang,
    });
}

export function deleteNavigation(transport: Transport, id: string, lang: TLang) {
    return transport.delete<INavigation[]>(ApiPaths.DELETE_NAVIGATION.replace(":id", id), { lang });
}

export function reorderNavigations(transport: Transport, reorder: INavigationOrder[], lang: TLang) {
    return transport.put<INavigationOrder[], INavigation[]>(ApiPaths.REORDER_NAVIGATION, reorder, {
        lang,
    });
}
