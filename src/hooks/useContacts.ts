import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IContact, IDictionary } from "../entities";
import { ContactAPI } from "../api";

export interface IUseContacts {
    contactTypes: IDictionary[];
    contacts: IContact[];
    contact?: IContact;
    createContact: (data: Partial<IContact>) => Promise<void>;
    getContact: (id: string) => Promise<void>;
    updateContact: (id: string, data: Partial<IContact>) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
}

export function useContacts(): IUseContacts {
    const transport = useMemo(() => Transport.create(), []);
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [contact, setContact] = useState<IContact | undefined>(undefined);
    const [contactTypes, setContactTypes] = useState<IDictionary[]>([]);

    const types = useCallback(() => {
        ContactAPI.fetchContactTypes(transport).then((response) => setContactTypes(response.data));
    }, [transport]);

    const list = useCallback(() => {
        ContactAPI.fetchContacts(transport).then((response) => setContacts(response.data));
    }, [transport]);

    const createContact = useCallback((data:  Partial<IContact>) => {
        return ContactAPI.createContact(transport, data).then(list);
    }, [transport]);

    const getOne = useCallback(
        (id: string) => {
            return ContactAPI.fetchContact(transport, id).then((response) =>
                setContact(response.data),
            );
        },
        [transport],
    );

    const update = useCallback((id: string, data: Partial<IContact>) => {
        return ContactAPI.updateContact(transport, id, data).then(list);
    }, [transport]);

    const deleteContact = useCallback((id: string) => {
        return ContactAPI.deleteContact(transport, id).then(list);
    }, [transport]);

    useEffect(() => {
        list();
        types();
    }, [list]);

    return { contact, contacts, getContact: getOne, updateContact: update, deleteContact, createContact, contactTypes };
}
