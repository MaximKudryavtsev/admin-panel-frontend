import React, { useEffect } from "react";
import { useAdmin } from "../../hooks";
import { css } from "emotion";
import { Button } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import { Card } from "../../components/card";
import { TLang } from "../../entities";
import { useSnackbar } from "notistack";
import { Contacts } from "../../widgets/contacts";

interface IControlPanelProps {
    setPageTitle(title: string): void;
}

const classNames = {
    wrapper: css`
        display: flex;
        flex-wrap: wrap;
    `,
    card: css`
        margin: 0 24px 24px 0;
    `,
    contacts: css`
        width: 600px;
        box-sizing: border-box;
    `,
    blog: css`
        height: fit-content;
    `,
};

export const ControlPanel = (props: IControlPanelProps) => {
    const { setPageTitle } = props;
    const { updateBlog, useContacts } = useAdmin();
    const { enqueueSnackbar } = useSnackbar();
    const {
        contact,
        contacts,
        createContact,
        deleteContact,
        getContact,
        updateContact,
    } = useContacts();

    useEffect(() => setPageTitle("Панель управления"), [setPageTitle]);

    const onUpdateBlog = (lang: TLang) => {
        updateBlog(lang).then(() => enqueueSnackbar("Обновлено!", { variant: "success" }));
    };

    return (
        <div className={classNames.wrapper}>
            <Card title={"Блог"} classes={{ root: css([classNames.card, classNames.blog]) }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Update />}
                    className={css`
                        margin-right: 24px;
                    `}
                    onClick={() => onUpdateBlog("ru")}
                >
                    Обновить русский блог
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Update />}
                    onClick={() => onUpdateBlog("en")}
                >
                    Обновить английский блог
                </Button>
            </Card>
            <Card
                title={"Контактные данные"}
                classes={{ root: css([classNames.card, classNames.contacts]) }}
            >
                <Contacts
                    contacts={contacts}
                    contact={contact}
                    createContact={createContact}
                    onGetContact={getContact}
                />
            </Card>
        </div>
    );
};
