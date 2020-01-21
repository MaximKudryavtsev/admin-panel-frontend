import { Transport } from "../transport";
import {
    INavigation,
    INavigationOrder,
    INavigationType,
    TCreateNavigationRequest,
    TLang,
    TypeNavigation,
} from "../entities";
import { ApiPaths } from "../config";

export function getNavigationTypes(transport: Transport, type: TypeNavigation) {
    return transport.get<INavigationType[]>(ApiPaths.GET_NAVIGATION_TYPES, {type});
}

export function getNavigationList(transport: Transport, lang: TLang, type: TypeNavigation) {
    return transport.get<INavigation[]>(ApiPaths.GET_NAVIGATION_LIST, { lang, type });
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

export function createNavigation(transport: Transport, navigation: TCreateNavigationRequest, lang: TLang, type: TypeNavigation) {
    return transport.post<TCreateNavigationRequest, INavigation[]>(ApiPaths.CREATE_NAVIGATION, navigation, {
        lang,
        type
    });
}

export function deleteNavigation(transport: Transport, id: string, lang: TLang, type: TypeNavigation) {
    return transport.delete<INavigation[]>(ApiPaths.DELETE_NAVIGATION.replace(":id", id), { lang, type });
}

export function reorderNavigations(transport: Transport, reorder: INavigationOrder, lang: TLang, type: TypeNavigation) {
    return transport.put<INavigationOrder, INavigation[]>(ApiPaths.REORDER_NAVIGATION, reorder, {
        lang, type
    });
}
