import React, { useEffect, useState } from "react";
import { IContact } from "../../entities";
import { Popup } from "../../components/popup";
import { css } from "emotion";
import { Button, Checkbox, Divider, FormControlLabel } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { findIndex } from "lodash";

interface IChooseContactsProps {
    open: boolean;
    contacts?: IContact[];
    selectedContacts?: IContact[];

    onClose?(): void;

    onSave?(contacts: IContact[]): void;
}

const classNames = {
    content: css`
        padding: 24px;
    `,
    button: css`
        width: 100%;
    `,
    row: css`
        display: flex;
        align-items: center;
    `,
};

export const ChooseContactsPopup = (props: IChooseContactsProps) => {
    const { open, contacts = [], onClose, onSave } = props;

    const [selectedContacts, setSelectedContacts] = useState(props.selectedContacts || []);

    useEffect(() => {
        if (props.selectedContacts) {
            setSelectedContacts(props.selectedContacts);
        }
    }, [props.selectedContacts]);

    const isContactSelected = (id: string) => {
        return !!selectedContacts.find((item) => item._id === id);
    };

    const selectContact = (id: string, checked: boolean) => {
        if (checked) {
            const selected = contacts.find((item) => item._id === id);
            if (selected) {
                selectedContacts.push(selected);
                setSelectedContacts([...selectedContacts]);
            }
        } else {
            const index = findIndex(selectedContacts, (item) => item._id === id);
            if (index >= 0) {
                selectedContacts.splice(index, 1);
                setSelectedContacts([...selectedContacts]);
            }
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave(selectedContacts);
        }
    };

    return (
        <Popup open={open} title={"Выберите контакты"} onClose={onClose}>
            <div className={classNames.content}>
                {contacts.map((item) => (
                    <div key={item._id} className={classNames.row}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isContactSelected(item._id)}
                                    onChange={(event, checked) => selectContact(item._id, checked)}
                                    color={"primary"}
                                />
                            }
                            label={item.title}
                        />
                    </div>
                ))}
            </div>
            <Divider />
            <div className={classNames.content}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    className={classNames.button}
                    onClick={handleSave}
                >
                    Сохранить
                </Button>
            </div>
        </Popup>
    );
};
