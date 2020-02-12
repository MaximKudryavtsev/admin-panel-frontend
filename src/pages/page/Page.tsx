import React, { useEffect, useMemo, useState } from "react";
import { Route, Switch, useParams } from "react-router";
import { usePage } from "../../hooks/page";
import { IBlock, IPage, TLang } from "../../entities";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Add, ArrowBack, Build, Pageview } from "@material-ui/icons";
import { getServerError } from "../../utils";
import { AppContext } from "../../context";
import { useBlock, useCustomSnackbar } from "../../hooks";
import { PageInfo } from "../../widgets/page-info";
import { AddBlockPopup } from "../../widgets/add-block-popup";
import { css } from "emotion";
import { BlockTabs } from "../../blocks/block-tabs";
import { FullScreenBlock } from "../full-screen-block";
import { Transport } from "../../transport";
import { PreviewPage } from "../preview-page";

interface IPageProps {
    baseUrl: string;
    lang: TLang;

    setPageTitle(title: string): void;
}

const classNames = {
    button: css`
        margin: 30px 30px 30px 0;
    `,
    titleGroup: css`
        margin-bottom: 10px;
    `,
};

export const Page = (props: IPageProps) => {
    const { setPageTitle, baseUrl, lang } = props;
    const { id } = useParams();
    const [addBlockVisible, setAddBlockVisible] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const transport = useMemo(() => Transport.create(), []);

    const { page, statuses, pageAuthor, updatePage, deletePage, buildPage } = usePage(
        transport,
        String(id),
    );
    const { blockTypes, createBlock, blocks, deleteBlock, updateBlock } = useBlock(
        transport,
        String(id),
    );
    const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();

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
            .then(() => showSuccessSnackbar("Успешно сохранено"))
            .catch((error) => {
                const err = getServerError(error);
                if (err) {
                    showErrorSnackbar(err?.title);
                }
            });
    };

    const onDeletePage = () => {
        return deletePage()
            .then(goToList)
            .catch((error) => {
                const err = getServerError(error);
                if (err) {
                    showErrorSnackbar(err?.title);
                }
            });
    };

    const onCreateBlock = (data: { type: string }) => {
        createBlock(data.type)
            .then(onAddBlockClose)
            .catch((error) => {
                const err = getServerError(error);
                if (err) {
                    showErrorSnackbar(err?.title);
                }
            });
    };

    const onUpdateBlock = (id: string, data: IBlock<any>) => {
        return updateBlock(id, data).then(() => {
            showSuccessSnackbar("Успешно сохранено");
        });
    };

    const onDeleteBlock = (id: string) => {
        deleteBlock(id).catch((error) => {
            const err = getServerError(error);
            if (err) {
                showErrorSnackbar(err?.title);
            }
        });
    };

    const onBuildPage = () => {
        buildPage()
            .then(() => showSuccessSnackbar("Успешно"))
            .catch((error) => {
                const err = getServerError(error);
                if (err) {
                    showErrorSnackbar(err?.title);
                }
            });
    };

    const goToPreview = () => {
        AppContext.getHistory().push(`/pages/${page?._id}/preview`);
    };

    const onCloseFullScreenBlock = () => {
        AppContext.getHistory().push(`/pages/${page?._id}`);
    };

    const onOpenFullscreen = () => setFullscreen(true);

    return (
        <React.Fragment>
            <Switch>
                <Route path={`${baseUrl}/${page?._id}/block/:blockId`} exact>
                    <FullScreenBlock
                        onClose={onCloseFullScreenBlock}
                        statuses={statuses}
                    />
                </Route>
                <Route path={`${baseUrl}/${page?._id}/preview`} exact>
                    <PreviewPage pageId={String(page?._id)} onClose={onCloseFullScreenBlock} />
                </Route>
            </Switch>
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
            <Button
                variant="contained"
                color="primary"
                size={"large"}
                className={classNames.button}
                onClick={goToPreview}
                startIcon={<Pageview />}
            >
                Предварительный просмотр
            </Button>
            <Button
                variant="contained"
                color="primary"
                size={"large"}
                className={classNames.button}
                startIcon={<Build />}
                onClick={onBuildPage}
            >
                Собрать страницу
            </Button>
            <BlockTabs
                statuses={statuses}
                blocks={blocks}
                onDeleteBlock={onDeleteBlock}
                onUpdateBlock={onUpdateBlock}
                baseUrl={`${baseUrl}/${page?._id}`}
                onOpenFullscreen={onOpenFullscreen}
                lang={lang}
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
