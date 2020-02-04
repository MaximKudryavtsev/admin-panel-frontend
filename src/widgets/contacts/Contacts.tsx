import React, { useState } from "react";
import { IContact } from "../../entities";
import { css } from "emotion";
import {
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Fab,
    IconButton,
    Typography
} from "@material-ui/core";
import { Add, Delete, Edit, ExpandMore } from "@material-ui/icons";
import { AddContactPopup } from "../add-contact-popup";

interface IContactsProps {
    contacts?: IContact[];

    onGetContact?(id: string): void;

    onOpenPopup?(): void;
}

const classNames = {
    content: css`
        margin-bottom: 24px;
    `,
    contacts: css`
        margin: 24px 0;
    `,
    item: css`
        display: flex;
    `,
    icons: css`
        margin-left: auto;
    `,
    icon: css`
        margin-right: 24px;
    `,
};

export const Contacts = (props: IContactsProps) => {
    const { contacts = [], onGetContact, onOpenPopup } = props;

    const ru = contacts.filter((item) => item.lang === "ru");
    const en = contacts.filter((item) => item.lang === "en");
    const [modalOpen, setModalOpen] = useState(false);

    function onModalOpen(): void {
        setModalOpen(true);
    }

    function omModalClose(): void {
        setModalOpen(false);
    }

    const handleGetContact = (id: string) => {
        if (onGetContact) {
            onGetContact(id);
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
                                <div className={classNames.item}>
                                    <Typography>{item.title}</Typography>
                                    <div className={classNames.icons}>
                                        <IconButton
                                            className={classNames.icon}
                                            onClick={() => handleGetContact(item._id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Fab color="primary" aria-label="add" onClick={onModalOpen}>
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
                                <div className={classNames.item}>
                                    <Typography>{item.title}</Typography>
                                    <div className={classNames.icons}>
                                        <IconButton
                                            className={classNames.icon}
                                            onClick={() => handleGetContact(item._id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Fab color="primary" aria-label="add" onClick={onModalOpen}>
                            <Add />
                        </Fab>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <AddContactPopup open={modalOpen} onClose={omModalClose} />
        </div>
    );
};
