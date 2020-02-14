import React, { createElement, useEffect, useMemo, useState } from "react";
import { css } from "emotion";
import { usePreviewPage } from "../../hooks/page";
import { Transport } from "../../transport";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getPreviewBlock } from "../../preview-blocklist/previewBlockList";
import { PreviewFooter } from "../../preview-blocklist/preview-footer";
import { PreviewHeader } from "../../preview-blocklist/preview-header";

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
        margin-bottom: 165px;
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
    `,
};

interface IPreviewPageProps {
    pageId: string;
    footerVisible?: boolean;

    onClose?(): void;
}

export const PreviewPage = (props: IPreviewPageProps) => {
    const { pageId, onClose, footerVisible } = props;
    const transport = useMemo(() => Transport.create(), []);
    const { page, getPreviewFooter, footer, header } = usePreviewPage(transport, pageId);

    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(true), []);
    useEffect(() => {
        if (footerVisible) {
            getPreviewFooter();
        }
    }, [footerVisible, getPreviewFooter]);

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
                <PreviewHeader header={header} />
                <div className={classNames.grid}>
                    <Typography variant={"h2"} className={classNames.title}>
                        {page?.title}
                    </Typography>
                    {page?.body.map((item, index) =>
                        <React.Fragment key={index}>
                            {getPreviewBlock(item.type.label) && createElement(getPreviewBlock(item.type.label), { data: item.data })}
                        </React.Fragment>
                    )}
                </div>
                {footerVisible && <PreviewFooter footer={footer} />}
            </div>
        </Dialog>
    );
};
