import React, { useEffect, useState } from "react";
import { IContact, IDictionary, TLang } from "../../entities";
import { css } from "emotion";
import { Fab, IconButton, Paper, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { AddContactPopup } from "../add-contact-popup";
import { getServerError } from "../../utils";
import { ConfirmPopup } from "../../components/confirm-popup";
import { trim } from "lodash";
import { useCustomSnackbar } from "../../hooks";

interface IContactsProps {
    contacts?: IContact[];
    contact?: IContact;
    contactTypes?: IDictionary[];
    lang: TLang;

    setLanguage(lang: TLang): void;

    onGetContact?(id: string): Promise<void>;

    createContact?(data: Partial<IContact>): Promise<void>;

    deleteContact?(id: string): Promise<void>;

    updateContact?(id: string, data: Partial<IContact>): Promise<void>;
}

const classNames = {
    content: css`
        margin-bottom: 24px;
        width: 600px;
    `,
    contacts: css`
        margin: 24px 0;
    `,
    item: css`
        display: flex;
        width: 100%;
        padding: 5px 10px 5px 20px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 0;
        :first-child {
            border-radius: 4px 4px 0 0 !important;
        }
        :last-child {
            border-radius: 0 0 4px 4px !important;
            border-bottom: none;
        }
    `,
    icons: css`
        margin-left: auto;
    `,
    icon: css`
        margin-right: 24px;
    `,
    type: css`
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
    `,
};

export const ContactPanel = (props: IContactsProps) => {
    const {
        contacts = [],
        onGetContact,
        contact,
        createContact,
        deleteContact,
        updateContact,
        contactTypes = [],
        lang,
        setLanguage,
    } = props;

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [currentId, setCurrentId] = useState<string | undefined>(undefined);
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    function onCreateModalOpen(): void {
        setCreateOpen(true);
    }

    function onCreateModalClose(): void {
        setCreateOpen(false);
    }

    function onEditOpen(): void {
        setEditOpen(true);
    }

    function onEditClose(): void {
        setEditOpen(false);
    }

    const onDeleteOpen = (id: string) => {
        setDeleteOpen(true);
        setCurrentId(id);
    };

    function onDeleteClose(): void {
        setDeleteOpen(false);
    }

    const handleGetContact = (id: string) => {
        if (onGetContact) {
            onGetContact(id).then(() => onEditOpen());
        }
    };

    const handleCreate = (data: Partial<IContact>) => {
        if (createContact) {
            createContact({ ...data, title: trim(data.title), lang })
                .then(() => onCreateModalClose())
                .catch((error) => {
                    const err = getServerError(error);
                    if (err) {
                        showErrorSnackbar(err.title)
                    }
                });
        }
    };

    const handleUpdate = (data: Partial<IContact>) => {
        if (updateContact) {
            updateContact(data._id!, { ...data, title: trim(data.title) })
                .then(() => {
                    showSuccessSnackbar("Обновлено");
                    onEditClose();
                })
                .catch((error) => {
                    const err = getServerError(error);
                    if (err) {
                        showErrorSnackbar(err.title)
                    }
                });
        }
    };

    const handleDelete = () => {
        if (deleteContact && currentId) {
            deleteContact(currentId).then(onDeleteClose);
        }
    };

    return (
        <div>
            <div className={classNames.content}>
                <div className={classNames.contacts}>
                    {contacts.map((item) => (
                        <Paper className={classNames.item}>
                            <Typography>{item.title}</Typography>
                            &nbsp; <span className={classNames.type}>({item.type.title})</span>
                            <div className={classNames.icons}>
                                <IconButton onClick={() => handleGetContact(item._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => onDeleteOpen(item._id)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </div>
                <Fab color="primary" aria-label="add" onClick={onCreateModalOpen}>
                    <Add />
                </Fab>
            </div>
            <AddContactPopup
                title={"Добавить контакт"}
                open={createOpen}
                onClose={onCreateModalClose}
                onSubmit={handleCreate}
                contactTypes={contactTypes}
            />
            <AddContactPopup
                title={"Редактировать контакт"}
                contact={contact}
                open={editOpen}
                onClose={onEditClose}
                onSubmit={handleUpdate}
                contactTypes={contactTypes}
            />
            <ConfirmPopup
                title={"Вы действительно хотите удалть контакт?"}
                submitTitle={"Удалить"}
                open={deleteOpen}
                onClose={onDeleteClose}
                onSubmit={handleDelete}
            />
        </div>
    );
};
