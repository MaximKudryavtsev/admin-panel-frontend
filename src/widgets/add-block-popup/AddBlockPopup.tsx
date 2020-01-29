import React from "react";
import { Popup } from "../../components/popup";
import { CustomForm } from "../../components/custom-form";
import { css } from "emotion";
import * as Yup from "yup";
import { IDictionary } from "../../entities";
import { Select } from "../../components/select";
import { Save } from "@material-ui/icons";
import { Button } from "@material-ui/core";

interface IAddBlockPopupProps {
    open: boolean;
    types?: IDictionary[];

    onClose?(): void;

    onSubmit?(data: {type: string}): void;
}

const classNames = {
    wrapper: css`
        padding: 24px;
    `,
    field: css`
        margin-bottom: 30px;
    `,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
    `,
};

const ValidationSchema = Yup.object().shape({
    type: Yup.string().required("Поле обязательно для заполнения"),
});

export const AddBlockPopup = (props: IAddBlockPopupProps) => {
    const { open, onClose, types = [], onSubmit } = props;

    return (
        <Popup open={open} title={"Добавить блок"} onClose={onClose}>
            <CustomForm
                validationSchema={ValidationSchema}
                onSubmit={onSubmit}
                render={(form) => (
                    <div className={classNames.wrapper}>
                        <Select
                            name={"type"}
                            label={"Тип блока"}
                            options={types.map((item) => ({ value: item._id, label: item.title }))}
                            classes={{ root: classNames.field }}
                        />
                        <div className={classNames.buttonWrapper}>
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
                    </div>
                )}
            />
        </Popup>
    );
};
