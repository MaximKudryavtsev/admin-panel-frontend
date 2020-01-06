import React from "react";
import { INavigationType } from "../../entities";
import { Popup } from "../../components/popup";
import { CustomForm } from "../../components/custom-form";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { Select } from "../../components/select";
import { Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";

export interface ICreateNavigation {
    title: string;
    navigationTypeId: string;
    link: string;
    parentId?: string;
}

interface IAddNavigationProps {
    open: boolean;
    navigationsTypes: INavigationType[];
    parentId?: string;

    onSubmit?(navigation: ICreateNavigation): void;

    onClose?(): void;
}

const styles = {
    content: css`
        padding: 0 24px 24px 24px;
    `,
    field: css`
        margin: 0 0 30px 0 !important;
    `,
};

export const AddNavigation = (props: IAddNavigationProps) => {
    const { open, navigationsTypes, onClose, onSubmit, parentId } = props;

    const handleSubmit = (data: Omit<ICreateNavigation, "parentId">) => {
        if (!onSubmit) {
            return;
        }
        onSubmit({...data, parentId})
    };

    return (
        <Popup title={"Добавить навигацию"} open={open} onClose={onClose}>
            <CustomForm
                onSubmit={handleSubmit}
                render={(form) => (
                    <div className={styles.content}>
                        <TextField
                            name={"title"}
                            label={"Название"}
                            classes={{ root: styles.field }}
                        />
                        <Select
                            name={"navigationTypeId"}
                            label={"Тип ссылки"}
                            options={navigationsTypes.map((item) => ({
                                value: item._id,
                                label: item.title,
                            }))}
                            classes={{ root: styles.field }}
                        />
                        <TextField name={"link"} label={"Сылка"} classes={{ root: styles.field }} />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            onClick={form?.submitForm}
                            disabled={!form?.isValid}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            />
        </Popup>
    );
};
