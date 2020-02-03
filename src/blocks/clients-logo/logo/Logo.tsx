import React, { ChangeEvent, useEffect, useRef } from "react";
import { useFile } from "../../../hooks";
import {
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Card, CardMedia, Divider, IconButton, Typography } from "@material-ui/core";
import { css } from "emotion";
import { Delete, DragIndicator, Edit } from "@material-ui/icons";

export interface ILogo {
    id: string;
    colorlessFile?: File;
    coloredFile?: File;
    colorlessLink?: string;
    coloredLink?: string;
}

interface ILogoProps {
    logo: ILogo;
    name: string;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null;

    innerRef(element?: HTMLElement | null): any;

    setFieldValue(field: string, value: any, shouldValidate?: boolean): void;

    onDelete(): void;
}

const classNames = {
    header: css`
        padding: 5px 10px;
        display: flex;
        align-items: center;
    `,
    image: css`
        height: 180px;
    `,
    error: css`
        margin-top: 20px !important;
    `,
    input: css`
        display: none;
    `,
    logoBlock: css`
        margin-bottom: 24px;
    `,
};

export const Logo = (props: ILogoProps) => {
    const { logo, setFieldValue, draggableProps, dragHandleProps, innerRef, onDelete, name } = props;
    const {
        src: colorlessSrc,
        error: colorlessError,
        setSrc: colorlessSetSrc,
        loadFile: colorlessLoadFile,
    } = useFile({ whiteList: ["png", "jpg", "jpeg"], maxFileSize: 1048576 });
    const {
        src: coloredSrc,
        error: coloredError,
        setSrc: coloredSetSrc,
        loadFile: coloredLoadFile,
    } = useFile({ whiteList: ["png", "jpg", "jpeg"], maxFileSize: 1048576 });

    const colorlessRef = useRef<HTMLInputElement>(null);
    const coloredRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        coloredSetSrc(logo.coloredLink);
        colorlessSetSrc(logo.colorlessLink);
    }, [logo.colorlessLink, logo.coloredLink]);

    const onChangeColorless = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) {
            return;
        }
        setFieldValue(`${name}.colorlessFile`, file);
        colorlessLoadFile(file);
    };

    const onChangeColored = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) {
            return;
        }
        setFieldValue(`${name}.coloredFile`, file);
        coloredLoadFile(file);
    };

    const onChooseColoredFile = () => {
        if (!coloredRef.current) {
            return;
        }
        coloredRef.current.click();
    };

    const onChooseColorlessFile = () => {
        if (!colorlessRef.current) {
            return;
        }
        colorlessRef.current.click();
    };

    return (
        <Card variant={"outlined"} ref={innerRef} {...draggableProps}>
            <div className={classNames.header}>
                <div {...dragHandleProps}>
                    <IconButton>
                        <DragIndicator />
                    </IconButton>
                </div>
                <IconButton
                    onClick={onDelete}
                    className={css`
                        margin-left: auto;
                    `}
                >
                    <Delete />
                </IconButton>
            </div>
            <div className={css`padding: 0 24px;`}>
                <Card variant={"outlined"} className={classNames.logoBlock}>
                    <div className={classNames.header}>
                        <Typography align={"center"}>
                            Черно-белое лого
                        </Typography>
                        <IconButton onClick={onChooseColorlessFile} className={css`margin-left: auto`}>
                            <Edit />
                        </IconButton>
                    </div>
                    <Divider />
                    <CardMedia image={colorlessSrc} className={classNames.image} />
                    {colorlessError && (
                        <Typography color={"error"} align={"center"} className={classNames.error}>
                            {colorlessError}
                        </Typography>
                    )}
                    <input
                        type={"file"}
                        name={`${name}.colorlessFile`}
                        ref={colorlessRef}
                        onChange={onChangeColorless}
                        className={classNames.input}
                    />
                </Card>
                <Card variant={"outlined"} className={classNames.logoBlock}>
                    <div className={classNames.header}>
                        <Typography align={"center"}>
                            Цветное лого
                        </Typography>
                        <IconButton onClick={onChooseColoredFile} className={css`margin-left: auto`}>
                            <Edit />
                        </IconButton>
                    </div>
                    <Divider />
                    <CardMedia image={coloredSrc} className={classNames.image} />
                    {coloredError && (
                        <Typography color={"error"} align={"center"} className={classNames.error}>
                            {coloredError}
                        </Typography>
                    )}
                    <input
                        type={"file"}
                        name={`${name}.coloredFile`}
                        ref={coloredRef}
                        onChange={onChangeColored}
                        className={classNames.input}
                    />
                </Card>
            </div>
        </Card>
    );
};
