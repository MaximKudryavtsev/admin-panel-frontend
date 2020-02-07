import { Transport } from "../transport";
import { IContact, IDictionary, IIdResponse, TLang } from "../entities";
import { ApiPaths } from "../config";

export function fetchContactTypes(transport: Transport) {
    return transport.get<IDictionary[]>(`${ApiPaths.CONTACTS}/types`);
}

export function fetchContacts(transport: Transport, lang: TLang) {
    return transport.get<IContact[]>(ApiPaths.CONTACTS, { lang });
}

export function fetchContact(transport: Transport, id: string, lang: TLang) {
    return transport.get<IContact>(`${ApiPaths.CONTACTS}/${id}`, { lang });
}

export function createContact(transport: Transport, data: Partial<IContact>, lang: TLang) {
    return transport.post<Partial<IContact>, IIdResponse>(ApiPaths.CONTACTS, data, { lang });
}

export function updateContact(transport: Transport, id: string, data: Partial<IContact>, lang: TLang) {
    return transport.put<Partial<IContact>, IIdResponse>(`${ApiPaths.CONTACTS}/${id}`, data, { lang });
}

export function deleteContact(transport: Transport, id: string, lang: TLang) {
    return transport.delete<void>(`${ApiPaths.CONTACTS}/${id}`, { lang });
}
