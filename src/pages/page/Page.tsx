import React, { createElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePage } from "../../hooks/page";
import { IBlock, IPage } from "../../entities";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Add, ArrowBack } from "@material-ui/icons";
import { getServerError } from "../../utils";
import { AppContext } from "../../context";
import { Snackbar } from "../../components/snackbar";
import { useBlock, useSnackbar } from "../../hooks";
import { PageInfo } from "../../widgets/page-info";
import { AddBlockPopup } from "../../widgets/add-block-popup";
import { css } from "emotion";
import { getBlock, IBlockProps } from "../../blocks";

interface IPageProps {
    setPageTitle(title: string): void;
}

const classNames = {
    button: css`
        margin: 30px 0;
    `,
};

export const Page = (props: IPageProps) => {
    const { setPageTitle } = props;
    const { id } = useParams();
    const [addBlockVisible, setAddBlockVisible] = useState(false);

    const { page, statuses, pageAuthor, updatePage, deletePage } = usePage(String(id));
    const { blockTypes, createBlock, blocks, deleteBlock, updateBlock } = useBlock(String(id));
    const { error, snackbar, setSnackbarError, setSnackbarState, onSnackbarClose } = useSnackbar();

    useEffect(() => {
        if (!page) {
            return;
        }
        setPageTitle(page?.title);
    }, [page, setPageTitle]);

    function onAddBlockOpen(): void {
        setAddBlockVisible(true);
    }

    function onAddBlockClose(): void {
        setAddBlockVisible(false);
    }

    const goToList = () => {
        AppContext.getHistory().push("/pages");
    };

    const onUpdatePage = (data: Partial<IPage>) => {
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

    const onDeletePage = () => {
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

    const onCreateBlock = (data: { type: string }) => {
        createBlock(data.type).then(onAddBlockClose);
    };

    const onUpdateBlock = (id: string, data: IBlock<any>) => {
        updateBlock(id, data).then(() => {
            setSnackbarError(false);
            setSnackbarState({
                open: true,
                message: "Успешно сохранено",
            });
        });
    };

    return (
        <React.Fragment>
            <Tooltip title={"К списку страниц"} placement={"right"}>
                <IconButton onClick={goToList}>
                    <ArrowBack />
                </IconButton>
            </Tooltip>
            <PageInfo
                page={page}
                pageAuthor={pageAuthor}
                statuses={statuses}
                onUpdate={onUpdatePage}
                onDelete={onDeletePage}
            />
            <Button
                variant="contained"
                color="primary"
                size={"large"}
                startIcon={<Add />}
                onClick={onAddBlockOpen}
                className={classNames.button}
            >
                Добавить блок
            </Button>
            {blocks.map((item) => (
                <div
                    key={item._id}
                    className={css`
                        margin-bottom: 20px;
                    `}
                >
                    {createElement<IBlockProps>(getBlock(item.type.label), {
                        block: item,
                        statuses,
                        onDelete: deleteBlock,
                        onSubmit: onUpdateBlock,
                    })}
                </div>
            ))}
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                error={error}
                onClose={onSnackbarClose}
            />
            <AddBlockPopup
                open={addBlockVisible}
                types={blockTypes}
                onClose={onAddBlockClose}
                onSubmit={onCreateBlock}
            />
        </React.Fragment>
    );
};
