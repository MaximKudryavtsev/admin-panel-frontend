import { css } from "emotion";
import { useFile } from "../../../hooks";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { TextField } from "../../../components/text-field";
import { Delete, DragIndicator, Edit } from "@material-ui/icons";
import {
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

interface IFeedbackProps {
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null;

    innerRef(element?: HTMLElement | null): any;
    feedback: IFeedback;
    name: string;

    setFieldValue(field: string, value: any, shouldValidate?: boolean): void;

    onDelete(): void;
}

export interface IFeedback {
    file?: File;
    id?: string;
    imageLink: string;
    text: string;
    name: string;
    position: string;
}

const feedbackClassNames = {
    card: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    image: css`
        height: 180px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    input: css`
        display: none;
    `,
    error: css`
        margin-top: 20px !important;
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
};

export const Feedback = (props: IFeedbackProps) => {
    const {
        feedback,
        name,
        setFieldValue,
        onDelete,
        innerRef,
        draggableProps,
        dragHandleProps,
    } = props;

    const { src, error, setSrc, loadFile } = useFile({
        whiteList: ["png", "jpg", "jpeg"],
        maxFileSize: 1048576,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSrc(feedback.imageLink);
    }, [feedback.imageLink, setSrc]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        setFieldValue(`${name}.file`, event.target.files?.item(0));
        if (!file) {
            return;
        }
        loadFile(file);
    };

    const onChooseFile = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };

    return (
        <Card variant={"outlined"} ref={innerRef} {...draggableProps}>
            <div className={feedbackClassNames.iconWrapper}>
                <div {...dragHandleProps}>
                    <IconButton>
                        <DragIndicator />
                    </IconButton>
                </div>
                <div className={feedbackClassNames.icons}>
                    <IconButton onClick={onChooseFile}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={onDelete}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
            <CardMedia image={src} title={feedback.name} className={feedbackClassNames.image} />
            {error && (
                <Typography color={"error"} align={"center"} className={feedbackClassNames.error}>
                    {error}
                </Typography>
            )}
            <input
                type="file"
                name={`${name}.file`}
                className={feedbackClassNames.input}
                ref={inputRef}
                onChange={onChange}
            />
            <CardContent className={feedbackClassNames.card}>
                <TextField
                    name={`${name}.text`}
                    label={"Текст отзыва"}
                    textarea
                    classes={{ root: feedbackClassNames.field }}
                />
                <TextField
                    name={`${name}.name`}
                    label={"Имя"}
                    classes={{ root: feedbackClassNames.field }}
                />
                <TextField
                    name={`${name}.position`}
                    label={"Должность"}
                    classes={{ root: feedbackClassNames.field }}
                />
            </CardContent>
        </Card>
    );
};
