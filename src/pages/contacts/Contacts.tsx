import React, { useEffect, useState } from "react";
import { useContacts } from "../../hooks";
import { TLang } from "../../entities";
import { LanguageTab } from "../../widgets/language-tab";
import { ContactPanel } from "../../widgets/contact-panel";

interface IContactsProps {
    defaultLang: TLang;

    setPageTitle(title: string): void;
}

export const Contacts = (props: IContactsProps) => {
    const { setPageTitle, defaultLang } = props;
    const [language, setLanguage] = useState<TLang>(defaultLang);
    const {
        contactTypes,
        deleteContact,
        updateContact,
        getContact,
        createContact,
        contact,
        contacts,
    } = useContacts(language);

    useEffect(() => setPageTitle("Контакты"), [setPageTitle]);
    useEffect(() => setLanguage(defaultLang), [defaultLang]);

    return (
        <LanguageTab>
            <ContactPanel
                setLanguage={setLanguage}
                lang={"ru"}
                deleteContact={deleteContact}
                updateContact={updateContact}
                contactTypes={contactTypes}
                onGetContact={getContact}
                contact={contact}
                createContact={createContact}
                contacts={contacts}
            />
            <ContactPanel
                setLanguage={setLanguage}
                lang={"en"}
                deleteContact={deleteContact}
                updateContact={updateContact}
                contactTypes={contactTypes}
                onGetContact={getContact}
                contact={contact}
                createContact={createContact}
                contacts={contacts}
            />
        </LanguageTab>
    );
};
