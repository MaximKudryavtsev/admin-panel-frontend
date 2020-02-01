import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePage } from "../../hooks/page";
import { IBlock, IPage } from "../../entities";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Add, ArrowBack } from "@material-ui/icons";
import { getServerError } from "../../utils";
import { AppContext } from "../../context";
import { useBlock } from "../../hooks";
import { PageInfo } from "../../widgets/page-info";
import { AddBlockPopup } from "../../widgets/add-block-popup";
import { css } from "emotion";
import { BlockTabs } from "../../blocks/block-tabs";
import { useSnackbar } from "notistack";

interface IPageProps {
    setPageTitle(title: string): void;
}

const classNames = {
    button: css`
        margin: 30px 0;
    `,
    titleGroup: css`
        margin-bottom: 10px;
    `,
};

export const Page = (props: IPageProps) => {
    const { setPageTitle } = props;
    const { id } = useParams();
    const [addBlockVisible, setAddBlockVisible] = useState(false);

    const { page, statuses, pageAuthor, updatePage, deletePage } = usePage(String(id));
    const { blockTypes, createBlock, blocks, deleteBlock, updateBlock } = useBlock(String(id));
    const { enqueueSnackbar } = useSnackbar();

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
            .then(() => enqueueSnackbar("Успешно сохранено", {variant: "success"}))
            .catch((error) => {
                const err = getServerError(error);
                enqueueSnackbar(err?.title, {variant: "error"})
            });
    };

    const onDeletePage = () => {
        return deletePage()
            .then(goToList)
            .catch((error) => {
                const err = getServerError(error);
                enqueueSnackbar(err?.title, {variant: "error"})
            });
    };

    const onCreateBlock = (data: { type: string }) => {
        createBlock(data.type).then(onAddBlockClose);
    };

    const onUpdateBlock = (id: string, data: IBlock<any>) => {
        updateBlock(id, data).then(() => enqueueSnackbar("Успешно сохранено", {variant: "success"}));
    };

    const onDeleteBlock = (id: string) => {
        deleteBlock(id).catch((error) => {
            const err = getServerError(error);
            enqueueSnackbar(err?.title, {variant: "error"})
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
            <BlockTabs
                statuses={statuses}
                blocks={blocks}
                onDeleteBlock={onDeleteBlock}
                onUpdateBlock={onUpdateBlock}
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
