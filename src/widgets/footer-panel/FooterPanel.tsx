import React, { useEffect, useState } from "react";
import {
    ENavigationType,
    IContact,
    IDictionary,
    IFooter,
    TLang,
    TNavigationPage,
} from "../../entities";
import { css } from "emotion";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import { Edit, Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { Button, Card, Divider, IconButton, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { getServerError } from "../../utils";
import { Loading } from "../../components/loading";
import { Select } from "../../components/select";
import { ChooseContactsPopup } from "../choose-contacts-popup";
import { FieldArray } from "formik";

interface IFooterPanel {
    footer?: IFooter;
    lang: TLang;
    navigationTypes?: IDictionary[];
    pages?: TNavigationPage[];
    contacts?: IContact[];

    updateFooter?(data: Partial<IFooter>): Promise<void>;

    setLanguage(lang: TLang): void;
}

const classNames = {
    wrapper: css`
        width: 500px;
        padding: 24px;
    `,
    field: css`
        margin: 0 0 24px 0;
    `,
    button: css`
        width: 100%;
    `,
    contacts: css`
        padding: 24px 0;
    `,
    contactsHeader: css`
        display: flex;
        align-items: center;
    `,
    contactItem: css`
        padding: 18.5px 14px;
        margin-bottom: 24px;
    `,
};

export const FooterPanel = (props: IFooterPanel) => {
    const {
        footer,
        lang,
        updateFooter,
        setLanguage,
        navigationTypes = [],
        pages = [],
        contacts,
    } = props;
    const [editContacts, setEditContacts] = useState(false);

    function onEditContactsOpen(): void {
        setEditContacts(true);
    }

    function onEditContactsClose(): void {
        setEditContacts(false);
    }

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    const { enqueueSnackbar } = useSnackbar();

    const handleUpdate = (data: Partial<IFooter>) => {
        if (updateFooter) {
            updateFooter(data)
                .then(() => {
                    enqueueSnackbar("Успешно сохранено!", { variant: "success" });
                })
                .catch((err) => {
                    const error = getServerError(err);
                    enqueueSnackbar(error?.title, { variant: "error" });
                });
        }
    };

    const updateContacts = (contacts: IContact[]) => {
        handleUpdate({ ...footer, contacts });
        onEditContactsClose();
    };

    return (
        <Card className={classNames.wrapper}>
            <Loading loaded={footer}>
                <CustomForm<IFooter>
                    data={footer}
                    onSubmit={handleUpdate}
                    render={(form) => (
                        <div>
                            <TextField
                                name={"copyright"}
                                label={"Копирайт"}
                                textarea
                                classes={{ root: classNames.field }}
                            />
                            <Divider />
                            <div className={classNames.contacts}>
                                <div className={classNames.contactsHeader}>
                                    <Typography>Контакты</Typography>
                                    <IconButton
                                        className={css`
                                            margin-left: auto;
                                        `}
                                        onClick={onEditContactsOpen}
                                    >
                                        <Edit />
                                    </IconButton>
                                </div>
                                <FieldArray name={"contacts"}>
                                    {() =>
                                        form?.values?.contacts?.map((item, index) => (
                                            <TextField
                                                name={`contacts.${index}.title`}
                                                label={item.type.title}
                                                classes={{ root: classNames.field }}
                                                disable
                                                key={item._id}
                                            />
                                        ))
                                    }
                                </FieldArray>
                            </div>
                            <Divider className={classNames.field} />
                            <TextField
                                name={"buttonTitle"}
                                label={"Заголовок кнопки"}
                                classes={{ root: classNames.field }}
                            />
                            <Select
                                name={"navigationTypeId"}
                                label={"Тип ссылки"}
                                options={navigationTypes.map((item) => ({
                                    value: item._id,
                                    label: item.title,
                                }))}
                                classes={{ root: classNames.field }}
                            />
                            {navigationTypes.find(
                                (item) => item._id === form?.values.navigationTypeId,
                            )?.label === ENavigationType.INTERNAL ? (
                                <Select
                                    name={"buttonLink"}
                                    label={"Ссылка кнопки"}
                                    options={pages.map((item) => ({
                                        value: item._id,
                                        label: item.title,
                                    }))}
                                    classes={{ root: classNames.field }}
                                />
                            ) : (
                                <TextField
                                    name={"buttonLink"}
                                    label={"Ссылка кнопки"}
                                    classes={{ root: classNames.field }}
                                />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={
                                    !form?.isValid || isEqual(form?.values, form?.initialValues)
                                }
                                className={classNames.button}
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                />
            </Loading>
            <ChooseContactsPopup
                open={editContacts}
                onClose={onEditContactsClose}
                contacts={contacts}
                selectedContacts={footer?.contacts}
                onSave={updateContacts}
            />
        </Card>
    );
};
