import React, { useState } from "react";
import { IContact, IDictionary, TLang } from "../../entities";
import { css } from "emotion";
import {
    Card,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fab,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Add, Delete, Edit, ExpandMore } from "@material-ui/icons";
import { AddContactPopup } from "../add-contact-popup";
import { useSnackbar } from "notistack";
import { getServerError } from "../../utils";
import { ConfirmPopup } from "../../components/confirm-popup";
import { trim } from "lodash";

interface IContactsProps {
    contacts?: IContact[];
    contact?: IContact;
    contactTypes?: IDictionary[];

    onGetContact?(id: string): Promise<void>;

    createContact?(data: Partial<IContact>): Promise<void>;

    deleteContact?(id: string): Promise<void>;

    updateContact?(id: string, data: Partial<IContact>): Promise<void>;
}

const classNames = {
    content: css`
        margin-bottom: 24px;
        width: 100%;
    `,
    contacts: css`
        margin: 24px 0;
    `,
    item: css`
        display: flex;
        width: 100%;
        padding: 5px 10px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        margin-bottom: 24px;
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
    `
};

export const Contacts = (props: IContactsProps) => {
    const {
        contacts = [],
        onGetContact,
        contact,
        createContact,
        deleteContact,
        updateContact,
        contactTypes = [],
    } = props;

    const ru = contacts.filter((item) => item.lang === "ru");
    const en = contacts.filter((item) => item.lang === "en");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [language, setLanguage] = useState<TLang>("ru");
    const [currentId, setCurrentId] = useState<string | undefined>(undefined);
    const { enqueueSnackbar } = useSnackbar();

    function onCreateModalOpen(lang?: TLang): void {
        setCreateOpen(true);
        if (lang) {
            setLanguage(lang);
        }
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
            createContact({ ...data, title: trim(data.title), lang: language })
                .then(() => onCreateModalClose())
                .catch((error) => {
                    const err = getServerError(error);
                    enqueueSnackbar(err?.title, { variant: "error" });
                });
        }
    };

    const handleUpdate = (data: Partial<IContact>) => {
        if (updateContact) {
            updateContact(data._id!, {...data, title: trim(data.title)})
                .then(() => {
                    enqueueSnackbar("Обновлено!", { variant: "success" });
                    onEditClose();
                })
                .catch((error) => {
                    const err = getServerError(error);
                    enqueueSnackbar(err?.title, { variant: "error" });
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
            <ExpansionPanel variant={"outlined"}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Русский сайт</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                    <div className={classNames.content}>
                        <div className={classNames.contacts}>
                            {ru.map((item) => (
                                <Card variant={"outlined"} className={classNames.item}>
                                    <Typography>{item.title}</Typography>
                                    &nbsp; <span className={classNames.type}>({item.type.title})</span>
                                    <div className={classNames.icons}>
                                        <IconButton
                                            className={classNames.icon}
                                            onClick={() => handleGetContact(item._id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteOpen(item._id)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => onCreateModalOpen("ru")}
                        >
                            <Add />
                        </Fab>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel variant={"outlined"}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Английский сайт</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                    <div className={classNames.content}>
                        <div className={classNames.contacts}>
                            {en.map((item) => (
                                <Card variant={"outlined"} className={classNames.item}>
                                    <Typography>{item.title}</Typography>
                                    &nbsp; <span className={classNames.type}>({item.type.title})</span>
                                    <div className={classNames.icons}>
                                        <IconButton
                                            className={classNames.icon}
                                            onClick={() => handleGetContact(item._id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteOpen(item._id)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => onCreateModalOpen("en")}
                        >
                            <Add />
                        </Fab>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
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
