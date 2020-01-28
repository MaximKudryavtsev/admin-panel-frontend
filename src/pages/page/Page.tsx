import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePage } from "../../hooks/page";
import { IPage } from "../../entities";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { getServerError } from "../../utils";
import { AppContext } from "../../context";
import { Snackbar } from "../../components/snackbar";
import { useSnackbar } from "../../hooks";
import { PageInfo } from "../../widgets/page-info";

interface IPageProps {
    setPageTitle(title: string): void;
}

export const Page = (props: IPageProps) => {
    const { setPageTitle } = props;
    const { id } = useParams();

    const { page, statuses, pageAuthor, updatePage, deletePage } = usePage(String(id));
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
        updatePage(data)
            .then(() => {
                setSnackbarError(false);
                setSnackbarState({
                    open: true,
                    message: "Успешно сохранено",
                });
            })
            .catch((error) => {
                const err = getServerError(error);
                setSnackbarError(true);
                setSnackbarState({
                    open: true,
                    message: err?.title ?? "",
                });
            });
    };

    const onDelete = () => {
        return deletePage()
            .then(goToList)
            .catch((error) => {
                const err = getServerError(error);
                setSnackbarError(true);
                setSnackbarState({
                    open: true,
                    message: err?.title ?? "",
                });
            });
    };

    return (
        <React.Fragment>
            <IconButton onClick={goToList}>
                <ArrowBack />
            </IconButton>
            <PageInfo
                page={page}
                pageAuthor={pageAuthor}
                statuses={statuses}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                error={error}
                onClose={onSnackbarClose}
            />
        </React.Fragment>
    );
};
