import { css } from "emotion";
import { useFile } from "../../../hooks";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { TextField } from "../../../components/text-field";
import { Delete, Edit } from "@material-ui/icons";

interface IFeedbackProps {
    feedback: IFeedback;
    name: string;
    setFieldValue(field: string, value: any, shouldValidate?: boolean): void;

    onDelete(): void;
}

export interface IFeedback {
    file?: File;
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
    `
};

export const Feedback = (props: IFeedbackProps) => {
    const { feedback, name, setFieldValue, onDelete } = props;

    const { src, file, error, setSrc, deleteFile, loadFile } = useFile({
        whiteList: ["png", "jpg", "pdf", "gif", "jpeg"],
        maxFileSize: 1048576,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSrc(feedback.imageLink);
    }, [feedback.imageLink]);

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
        <Card variant={"outlined"}>
            <IconButton onClick={onChooseFile}>
                <Edit />
            </IconButton>
            <IconButton onClick={onDelete}>
                <Delete />
            </IconButton>
            <CardMedia
                image={src}
                title={feedback.name}
                className={feedbackClassNames.image}
            />
            {error && (
                <Typography color={"error"} align={"center"} className={feedbackClassNames.error}>
                    {error}
                </Typography>
            )}
            <input type="file" name={`${name}.file`} className={feedbackClassNames.input} ref={inputRef} onChange={onChange} />
            <CardContent className={feedbackClassNames.card}>
                <TextField name={`${name}.text`} label={"Текст отзыва"} textarea classes={{root: feedbackClassNames.field}} />
                <TextField name={`${name}.name`} label={"Имя"} classes={{root: feedbackClassNames.field}} />
                <TextField name={`${name}.position`} label={"Должность"} classes={{root: feedbackClassNames.field}} />
            </CardContent>
        </Card>
    );
};
