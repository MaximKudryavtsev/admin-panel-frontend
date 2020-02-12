import React, { createElement, useEffect, useMemo, useState } from "react";
import { css } from "emotion";
import { useClientPage } from "../../hooks/page";
import { Transport } from "../../transport";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getPreviewBlock } from "../../preview-blocklist/previewBlockList";

const classNames = {
    wrapper: css`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        padding: 40px 170px;
    `,
    grid: css`
        display: grid;
        grid-row-gap: 64px;  
    `,
    image: css`
        height: 500px;
    `,
    appBar: css`
        position: relative;
        height: 90px;
        justify-content: center;
    `,
    title: css`
        font-family: Ubuntu;
        font-size: 80px;
        font-weight: 700;
    `,
    content: css`
        padding: 0 250px;
        margin-bottom: 64px;
    `,
};

interface IPreviewPageProps {
    pageId: string;

    onClose?(): void;
}

export const PreviewPage = (props: IPreviewPageProps) => {
    const { pageId, onClose } = props;
    const transport = useMemo(() => Transport.create(), []);
    const { page } = useClientPage(transport, pageId);

    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(true), []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose}>
            <AppBar className={classNames.appBar} color={"default"}>
                <Toolbar
                    classes={{
                        root: css`
                            align-items: center;
                        `,
                    }}
                >
                    <Typography variant="h6">{page?.title}</Typography>
                    <IconButton
                        onClick={handleClose}
                        className={css`
                            margin-left: auto;
                        `}
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classNames.content}>
                <div className={classNames.grid}>
                    <Typography variant={"h2"} className={classNames.title}>
                        {page?.title}
                    </Typography>
                    {page?.body.map((item) =>
                        getPreviewBlock(item.type.label) && createElement(getPreviewBlock(item.type.label), { data: item.data }),
                    )}
                </div>
            </div>
        </Dialog>
    );
};
