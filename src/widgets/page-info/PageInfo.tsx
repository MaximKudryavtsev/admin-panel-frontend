import React, { useState } from "react";
import { IPage, IPageAuthor, IPageStatus } from "../../entities";
import { css } from "emotion";
import cn from "classnames";
import {
    Avatar, Backdrop,
    Button,
    CircularProgress,
    IconButton,
    Link,
    Paper, Tooltip,
    Typography,
} from "@material-ui/core";
import { AccountCircle, Delete, Save } from "@material-ui/icons";
import { formatData } from "../../utils";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import { Select } from "../../components/select";
import { isEqual } from "lodash";
import { ConfirmPopup } from "../../components/confirm-popup";

const classNames = {
    line: css`
        display: grid;
        align-items: center;
    `,
    fieldLine: css`
        grid-template-columns: 400px 400px 400px;
        grid-column-gap: 40px;
    `,
    content: css`
        padding: 24px;
    `,
    mb24: css`
        margin-bottom: 24px;
    `,
    backdrop: css`
        color: #fff;
        z-index: 10000;
    `,
    title: css`margin-bottom: 24px`
};

interface IPageInfoProps {
    page?: IPage;
    pageAuthor?: IPageAuthor;
    statuses?: IPageStatus[];

    onUpdate?(data: Partial<IPage>): void;

    onDelete?(): Promise<void>;
}

export const PageInfo = (props: IPageInfoProps) => {
    const { page, pageAuthor, onUpdate, statuses = [], onDelete } = props;
    const [deleteModal, setDeleteModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    function onDeleteModalOpen(): void {
        setDeleteModal(true);
    }

    function onDeleteModalClose(): void {
        setDeleteModal(false);
    }

    const handleDelete = () => {
        if (onDelete) {
            onDeleteModalClose();
            setBackdrop(true);
            onDelete().then(() => setBackdrop(false)).catch(() => setBackdrop(false));
        }
    };

    return (
        <React.Fragment>
            <Typography className={classNames.title} variant={"h6"}>Основная информация</Typography>
            <Paper className={classNames.content}>
                {!!page ? (
                    <React.Fragment>
                        <div
                            className={cn(
                                css`
                                    display: flex;
                                    align-items: center;
                                `,
                                classNames.mb24,
                            )}
                        >
                            <div
                                className={css`
                                    display: flex;
                                    margin-right: 20px;
                                `}
                            >
                                <Typography
                                    className={css`
                                        margin-right: 5px !important;
                                    `}
                                >
                                    Автор:{" "}
                                </Typography>
                                {pageAuthor?.avatar ? (
                                    <Avatar src={pageAuthor?.avatar} />
                                ) : (
                                    <AccountCircle />
                                )}
                                <Link
                                    href={`/user/${pageAuthor?._id}`}
                                    className={css`
                                        margin-left: 5px !important;
                                    `}
                                >
                                    {pageAuthor?.title}
                                </Link>
                            </div>
                            <div
                                className={css`
                                    display: flex;
                                    margin-right: 20px;
                                `}
                            >
                                <Typography
                                    className={css`
                                        margin-right: 5px !important;
                                    `}
                                >
                                    Дата создания:{" "}
                                </Typography>
                                <Typography
                                    className={css`
                                        margin-right: 5px !important;
                                    `}
                                >
                                    {formatData(page.createdAt, "DD.MM.YYYY HH:mm")}
                                </Typography>
                            </div>
                            <div
                                className={css`
                                    display: flex;
                                    margin-right: 20px;
                                `}
                            >
                                <Typography
                                    className={css`
                                        margin-right: 5px !important;
                                    `}
                                >
                                    Последнее обновление:{" "}
                                </Typography>
                                <Typography
                                    className={css`
                                        margin-right: 5px !important;
                                    `}
                                >
                                    {formatData(page.updatedAt, "DD.MM.YYYY HH:mm")}
                                </Typography>
                            </div>
                            <Tooltip title={"Удалить страницу"} placement={"left"}>
                                <IconButton
                                    className={css`
                                    margin-left: auto !important;
                                `}
                                    onClick={onDeleteModalOpen}
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <CustomForm<IPage>
                            onSubmit={onUpdate}
                            data={page}
                            render={(form) => (
                                <React.Fragment>
                                    <div
                                        className={cn(
                                            classNames.fieldLine,
                                            classNames.line,
                                            classNames.mb24,
                                        )}
                                    >
                                        <TextField name={"title"} label={"Название страницы"} />
                                        <TextField name={"link"} label={"Ссылка"} />
                                        <Select
                                            label={"Статус"}
                                            name={"statusId"}
                                            options={statuses.map((item) => ({
                                                value: item._id,
                                                label: item.title,
                                            }))}
                                        />
                                    </div>
                                    <div
                                        className={css`
                                            display: flex;
                                            justify-content: flex-end;
                                        `}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<Save />}
                                            onClick={form?.submitForm}
                                            size={"large"}
                                            disabled={isEqual(form?.values, form?.initialValues)}
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        />
                    </React.Fragment>
                ) : (
                    <CircularProgress />
                )}
            </Paper>
            <ConfirmPopup
                title={
                    "Вы действительно хотиет удалить страницу? Страница будет безвозвратно удалена."
                }
                open={deleteModal}
                submitTitle={"Удалить"}
                onClose={onDeleteModalClose}
                onSubmit={handleDelete}
            />
            <Backdrop open={backdrop} className={classNames.backdrop}>
                <CircularProgress color="inherit" />
                <Typography className={css`margin-left: 24px !important;`} variant={"h6"}  color={"inherit"}>Удаление</Typography>
            </Backdrop>
        </React.Fragment>
    );
};
