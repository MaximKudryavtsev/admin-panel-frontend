import React, { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import {
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { css } from "emotion";
import { IImageBlockIItem } from "../../entities";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { useFile } from "../../hooks";
import { Delete, DragIndicator, Edit } from "@material-ui/icons";
import { SwitchField } from "../../components/switch-field";

interface IDraggableImageBlockProps<T> {
    data: T;
    name: string;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null;
    variant?: "default" | "achievement" | "portfolio";

    innerRef(element?: HTMLElement | null): any;

    setFieldValue?(field: string, value: any, shouldValidate?: boolean): void;

    onDelete?(): void;

    render(): ReactNode;
}

const classNames = {
    content: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    image: css`
        height: 180px;
        background-size: contain;
    `,
    achievementImage: css`
        height: 200px;
        width: 200px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    icons: css`
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
    `,
    iconWrapper: css`
        display: flex;
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
    `,
    input: css`
        display: none;
    `,
    error: css`
        margin-top: 20px !important;
    `,
    achievementFields: css`
        display: flex;
    `,
    achievementCard: css`
        margin-bottom: 24px;
    `,
    achievementImageWrapper: css`
        padding-top: 40px;
        margin: 0 20px;
        display: flex;
    `,
    achievementContent: css`
        width: 100%;
        padding: 24px;
        box-sizing: border-box;
        align-items: flex-start;
    `,
};

export const DraggableImageBlock = <T extends IImageBlockIItem>(
    props: IDraggableImageBlockProps<T>,
) => {
    const {
        data,
        name,
        draggableProps,
        dragHandleProps,
        innerRef,
        onDelete,
        setFieldValue,
        render,
        variant = "default",
    } = props;

    const { src, error, setSrc, loadFile } = useFile({
        whiteList: ["png", "jpg", "jpeg"],
        maxFileSize: 1048576,
    });

    useEffect(() => {
        setSrc(data.imageLink);
    }, [data.imageLink, setSrc]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onChooseFile = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (setFieldValue) {
            setFieldValue(`${name}.file`, event.target.files?.item(0));
            if (!file) {
                return;
            }
            loadFile(file);
        }
    };

    return (
        <>
            {variant === "default" && (
                <Card variant={"outlined"} ref={innerRef} {...draggableProps}>
                    <div className={classNames.iconWrapper}>
                        <div {...dragHandleProps}>
                            <IconButton>
                                <DragIndicator />
                            </IconButton>
                        </div>
                        <div className={classNames.icons}>
                            <SwitchField name={`${name}.visible`} />
                            <IconButton onClick={onChooseFile}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={onDelete}>
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                    <input
                        type="file"
                        name={`${name}.file`}
                        className={classNames.input}
                        ref={inputRef}
                        onChange={onChange}
                    />
                    <CardMedia image={src} className={classNames.image} />
                    {error && (
                        <Typography color={"error"} align={"center"} className={classNames.error}>
                            {error}
                        </Typography>
                    )}
                    <CardContent classes={{ root: classNames.content }}>{render()}</CardContent>
                </Card>
            )}
            {variant === "achievement" && (
                <Card
                    variant={"outlined"}
                    ref={innerRef}
                    {...draggableProps}
                    className={classNames.achievementCard}
                >
                    <div className={classNames.iconWrapper}>
                        <div {...dragHandleProps}>
                            <IconButton>
                                <DragIndicator />
                            </IconButton>
                        </div>
                        <div className={classNames.icons}>
                            <IconButton onClick={onDelete}>
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                    <input
                        type="file"
                        name={`${name}.file`}
                        className={classNames.input}
                        ref={inputRef}
                        onChange={onChange}
                    />
                    <div className={classNames.achievementFields}>
                        <div className={classNames.achievementImageWrapper}>
                            <div>
                                <Card variant={"outlined"}>
                                    <CardMedia
                                        image={src}
                                        className={classNames.achievementImage}
                                    />
                                </Card>
                                {error && (
                                    <Typography
                                        color={"error"}
                                        align={"center"}
                                        className={classNames.error}
                                    >
                                        {error}
                                    </Typography>
                                )}
                            </div>
                            <IconButton
                                onClick={onChooseFile}
                                className={css`
                                    align-self: flex-start;
                                `}
                            >
                                <Edit />
                            </IconButton>
                        </div>
                        <CardContent classes={{ root: classNames.achievementContent }}>
                            {render()}
                        </CardContent>
                    </div>
                </Card>
            )}
            {variant === "portfolio" && (
                <Card
                    variant={"outlined"}
                    ref={innerRef}
                    {...draggableProps}
                    className={css`
                        margin-bottom: 24px;
                    `}
                >
                    <div className={classNames.iconWrapper}>
                        <div {...dragHandleProps}>
                            <IconButton>
                                <DragIndicator />
                            </IconButton>
                        </div>
                        <div className={classNames.icons}>
                            <SwitchField name={`${name}.visible`} />
                            <IconButton onClick={onChooseFile}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={onDelete}>
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                    <input
                        type="file"
                        name={`${name}.file`}
                        className={classNames.input}
                        ref={inputRef}
                        onChange={onChange}
                    />
                    <div
                        className={css`
                            display: flex;
                            padding: 0 24px;
                        `}
                    >
                        <div
                            className={css`
                                width: 40%;
                            `}
                        >
                            <CardMedia image={src} className={classNames.image} />
                            {error && (
                                <Typography
                                    color={"error"}
                                    align={"center"}
                                    className={classNames.error}
                                >
                                    {error}
                                </Typography>
                            )}
                        </div>
                        <CardContent classes={{ root: classNames.content }}>{render()}</CardContent>
                    </div>
                </Card>
            )}
        </>
    );
};
