import React from "react";
import { IBlockProps } from "../IBlockProps";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { css } from "emotion";
import { FieldArray } from "formik";
import { useContacts } from "../../hooks";
import { Select } from "../../components/select";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

interface IContactList {
    blocks: {
        left: string[];
        right: string[];
    };
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.object().shape({
            left: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
            right: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
        }),
    }),
});

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 100px;
        align-items: flex-start;
        justify-content: flex-start;
    `,
    column: css`
        display: grid;
        grid-row-gap: 24px;
    `,
    row: css`
        display: flex;
        align-items: center;
    `,
    button: css`
        width: fit-content;
    `,
};

export const ContactList = (props: IBlockProps<IContactList>) => {
    const { lang = "ru" } = props;

    const { contacts } = useContacts(lang);

    const contactsToSelect = contacts.map((item) => ({ value: item._id, label: item.title }));

    return (
        <BlockWrapper<IContactList>
            {...props}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div className={classNames.wrapper}>
                    <FieldArray
                        name={"data.blocks.left"}
                        render={(array) => (
                            <div className={classNames.column}>
                                {form?.values.data &&
                                    form?.values.data.blocks &&
                                    form?.values.data?.blocks.left &&
                                    form?.values.data?.blocks.left.map((item, index) => (
                                        <div className={classNames.row} key={index}>
                                            <Select
                                                name={`data.blocks.left.${index}`}
                                                options={contactsToSelect}
                                            />
                                            <IconButton onClick={() => array.remove(index)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    ))}
                                <IconButton
                                    onClick={() => array.push("")}
                                    className={classNames.button}
                                >
                                    <Add />
                                </IconButton>
                            </div>
                        )}
                    />
                    <FieldArray
                        name={"data.blocks.right"}
                        render={(array) => (
                            <div className={classNames.column}>
                                {form?.values.data &&
                                    form?.values.data.blocks &&
                                    form?.values.data?.blocks.right &&
                                    form?.values.data?.blocks.right.map((item, index) => (
                                        <div className={classNames.row} key={index}>
                                            <Select
                                                name={`data.blocks.right.${index}`}
                                                options={contactsToSelect}
                                            />
                                            <IconButton onClick={() => array.remove(index)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    ))}
                                <IconButton
                                    onClick={() => array.push("")}
                                    className={classNames.button}
                                >
                                    <Add />
                                </IconButton>
                            </div>
                        )}
                    />
                </div>
            )}
        />
    );
};
