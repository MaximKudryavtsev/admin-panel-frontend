import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePage } from "../../hooks/page";
import { css } from "emotion";
import { CustomForm } from "../../components/custom-form";
import { IPage } from "../../entities";
import { TextField } from "../../components/text-field";
import cn from "classnames";
import { Select } from "../../components/select";
import { Avatar, Button, CircularProgress, IconButton, Link, Paper, Typography } from "@material-ui/core";
import { AccountCircle, ArrowBack, Save } from "@material-ui/icons";
import { formatData, getServerError } from "../../utils";
import { isEqual } from "lodash";
import { AppContext } from "../../context";
import { Snackbar } from "../../components/snackbar";
import { useSnackbar } from "../../hooks";

interface IPageProps {
    setPageTitle(title: string): void;
}

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
};

export const Page = (props: IPageProps) => {
    const { setPageTitle } = props;
    const { id } = useParams();

    const { page, statuses, pageAuthor, updatePage } = usePage(String(id));
    const { error, snackbar, setSnackbarError, setSnackbarState, onSnackbarClose } = useSnackbar();

    useEffect(() => {
        if (!page) {
            return;
        }
        setPageTitle(page?.title);
    }, [page, setPageTitle]);

    const goToList = () => {
        AppContext.getHistory().push("/panel/pages");
    };

    const onUpdate = (data: Partial<IPage>) => {
         updatePage(data).then(() => {
             setSnackbarError(false);
             setSnackbarState({
                 open: true,
                 message: "Успешно сохранено"
             });
         }).catch((error) => {
             const err = getServerError(error);
             setSnackbarError(true);
             setSnackbarState({
                 open: true,
                 message: err?.title ?? ""
             });
         })
    };

    return (
        <React.Fragment>
            <IconButton onClick={goToList}>
                <ArrowBack />
            </IconButton>
            <Paper className={classNames.content}>
                {!!page ? (
                    <React.Fragment>
                        <div className={cn(css`display: flex`, classNames.mb24)}>
                            <div className={css`display: flex; margin-right: 20px;`}>
                                <Typography className={css`margin-right: 5px !important`}>Автор: </Typography>
                                {pageAuthor?.avatar ? <Avatar src={pageAuthor?.avatar} /> : <AccountCircle />}
                                <Link href={`/user/${pageAuthor?._id}`} className={css`margin-left: 5px !important;`}>{pageAuthor?.title}</Link>
                            </div>
                            <div className={css`display: flex; margin-right: 20px;`}>
                                <Typography className={css`margin-right: 5px !important`}>Дата создания: </Typography>
                                <Typography className={css`margin-right: 5px !important`}>{formatData(page.createdAt, "DD.MM.YYYY HH:mm")}</Typography>
                            </div>
                            <div className={css`display: flex; margin-right: 20px;`}>
                                <Typography className={css`margin-right: 5px !important`}>Последнее обновление: </Typography>
                                <Typography className={css`margin-right: 5px !important`}>{formatData(page.updatedAt, "DD.MM.YYYY HH:mm")}</Typography>
                            </div>
                        </div>
                        <CustomForm<IPage>
                            onSubmit={onUpdate}
                            data={page}
                            render={(form) => (
                                <React.Fragment>
                                    <div className={cn(classNames.fieldLine, classNames.line, classNames.mb24)}>
                                        <TextField
                                            name={"title"}
                                            label={"Название страницы"}
                                        />
                                        <TextField
                                            name={"link"}
                                            label={"Ссылка"}
                                        />
                                        <Select
                                            label={"Статус"}
                                            name={"statusId"}
                                            options={statuses.map((item) => ({
                                                value: item._id,
                                                label: item.title,
                                            }))}
                                        />
                                    </div>
                                    <div className={css`display: flex; justify-content: flex-end;`}>
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
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                error={error}
                onClose={onSnackbarClose}
            />
        </React.Fragment>
    );
};
