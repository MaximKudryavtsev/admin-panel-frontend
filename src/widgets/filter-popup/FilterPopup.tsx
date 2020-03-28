import React, { useState } from "react";
import { IFilter } from "../../entities";
import { Popup } from "../../components/popup";
import { css } from "emotion";
import * as Yup from "yup";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import { Add, Delete, Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { useCustomSnackbar } from "../../hooks";
import { getServerError } from "../../utils";
import {ConfirmPopup} from "../../components/confirm-popup";

interface IFilterPopupProps {
    open: boolean;
    filter?: IFilter;
    title: string;

    onSubmit?(data: Partial<IFilter>): void;

    onClose?(): void;

    onDeleteFilter?(filterPackId: string, filterId: string): Promise<void>;
}

const classNames = {
    content: css`
        padding: 24px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    row: css`
        display: flex;
        align-items: center;
    `,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
    `,
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Поле обязательно для заполнения"),
    filters: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Поле обязательно для заполнения"),
        }),
    ),
});

export const FilterPopup = (props: IFilterPopupProps) => {
    const { open, filter, onClose, onSubmit, title, onDeleteFilter } = props;
    const [deleteVisible, setDeleteVisible] = useState(false);
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();
    const [filterId, setFilterId] = useState<string | undefined>(undefined);

    const submitDeleteFilter = () => {
        if (onDeleteFilter && filter && filterId) {
            onDeleteFilter(filter._id, filterId)
                .then(() => setDeleteVisible(false))
                .catch((error) => {
                    const serverError = getServerError(error);
                    if (serverError) {
                        showErrorSnackbar(serverError.title);
                    }
                    setDeleteVisible(false);
                });
        }
    };

    const showDeleteFilterPopup = (index: number) => {
        if (filter) {
            const currentFilterId = filter.filters[index]._id;
            if (currentFilterId) {
                setFilterId(currentFilterId);
                setDeleteVisible(true);
            }
        }
    };

    const closeDeleteFilterPopup = () => {
        setDeleteVisible(false);
        setFilterId(undefined);
    };

    return (
        <>
            <Popup open={open} title={title} onClose={onClose}>
                <CustomForm<Partial<IFilter>>
                    data={filter}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    render={(form) => (
                        <div className={classNames.content}>
                            <TextField
                                name={"title"}
                                label={"Название группы фильтров"}
                                classes={{ root: classNames.field }}
                            />
                            <FieldArray
                                name={"filters"}
                                render={(array) => (
                                    <>
                                        {form?.values.filters &&
                                        form?.values.filters.map((item, index) => (
                                            <div className={classNames.row} key={index}>
                                                <TextField
                                                    name={`filters.${index}.title`}
                                                    label={`Фильтр ${index + 1}`}
                                                    classes={{ root: classNames.field }}
                                                />
                                                <IconButton
                                                    onClick={() =>
                                                        filter
                                                            ? showDeleteFilterPopup(index)
                                                            : array.remove(index)
                                                    }
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </div>
                                        ))}
                                        <IconButton onClick={() => array.push({ title: "" })}>
                                            <Add />
                                        </IconButton>
                                    </>
                                )}
                            />
                            <div className={classNames.buttonWrapper}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Save />}
                                    onClick={form?.submitForm}
                                    disabled={
                                        !form?.isValid || isEqual(form?.values, form?.initialValues)
                                    }
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    )}
                />
            </Popup>
            {deleteVisible && <ConfirmPopup
                title={"Вы действительно хотите удалить фильтр"}
                open={deleteVisible}
                submitTitle={"Удалить"}
                onSubmit={submitDeleteFilter}
                onClose={closeDeleteFilterPopup}
            />}
        </>
    );
};
