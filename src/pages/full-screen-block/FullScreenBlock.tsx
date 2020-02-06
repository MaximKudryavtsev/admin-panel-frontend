import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useSingleBlock } from "../../hooks/block";
import { Transport } from "../../transport";
import { Loading } from "../../components/loading";
import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { css } from "emotion";
import { Close, Save } from "@material-ui/icons";
import { CustomForm } from "../../components/custom-form";
import { isEqual } from "lodash";
import { IBlock, IDictionary } from "../../entities";
import * as Yup from "yup";
import { Select } from "../../components/select";

interface IFullScreenBlockProps {
    open: boolean;
    statuses?: IDictionary[];

    onClose?(): void;
}

const classNames = {
    appBar: css`
        position: relative;
        height: 90px;
        justify-content: center;
    `,
    title: css``,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
        padding: 24px;
    `,
    content: css`
        height: calc(100vh - 148px);
        padding: 24px;
        box-sizing: border-box;
    `,
    select: css`
        width: 400px;
        margin-left: 100px;
    `,
};

const ValidationSchema = Yup.object().shape({
    statusId: Yup.string().required("Поле обязательно для заполнения"),
});

export const FullScreenBlock = (props: IFullScreenBlockProps) => {
    const { onClose, statuses = [] } = props;
    const { blockId } = useParams();
    const [open, setOpen] = useState(false);
    const transport = useMemo(() => Transport.create(), []);
    const { updateBlock, block } = useSingleBlock(transport, String(blockId));

    useEffect(() => setOpen(true), []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    return (
        <Loading loaded={!!block}>
            <CustomForm<IBlock<any>>
                data={block}
                validationSchema={ValidationSchema}
                render={(form) => (
                    <Dialog fullScreen open={open} onClose={handleClose}>
                        <AppBar className={classNames.appBar} color={"default"}>
                            <Toolbar
                                classes={{
                                    root: css`
                                    align-items: center;
                                `,
                                }}
                            >
                                <Typography variant="h6" className={classNames.title}>
                                    {block?.type.title}
                                </Typography>
                                {block && (
                                    <Select
                                        name={"statusId"}
                                        label={"Статус"}
                                        options={statuses.map((item) => ({
                                            value: item._id,
                                            label: item.title,
                                        }))}
                                        classes={{ root: classNames.select }}
                                    />
                                )}
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
                            <h1>я родился</h1>
                        </div>
                        <Divider />
                        <div className={classNames.buttonWrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={!form?.isValid || isEqual(form?.values, form?.initialValues)}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </Dialog>
                )}
            />
        </Loading>
    );
};
