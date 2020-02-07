import React, { ChangeEvent, useEffect, useRef } from "react";
import { IMainAchievement } from "../MainAchievementsBlock";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { css } from "emotion";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { Delete, DragIndicator, Edit } from "@material-ui/icons";
import { useFile } from "../../../hooks";
import { TextField } from "../../../components/text-field";

interface IMainAchievementProps {
    name: string;
    achievement: IMainAchievement;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null;

    innerRef(element?: HTMLElement | null): any;

    setFieldValue(field: string, value: any, shouldValidate?: boolean): void;

    onDelete(): void;
}

const classNames = {
    content: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    image: css`
        height: 180px;
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
};

export const MainAchievement = (props: IMainAchievementProps) => {
    const {name, achievement, draggableProps, dragHandleProps, innerRef, onDelete, setFieldValue} = props;

    const { src, error, setSrc, loadFile } = useFile({
        whiteList: ["png", "jpg", "jpeg"],
        maxFileSize: 1048576,
    });

    useEffect(() => {
        setSrc(achievement.imageLink);
    }, [achievement.imageLink, setSrc]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onChooseFile = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        setFieldValue(`${name}.file`, event.target.files?.item(0));
        if (!file) {
            return;
        }
        loadFile(file);
    };

    return (
        <Card variant={"outlined"} ref={innerRef} {...draggableProps}>
            <div className={classNames.iconWrapper}>
                <div {...dragHandleProps}>
                    <IconButton>
                        <DragIndicator />
                    </IconButton>
                </div>
                <div className={classNames.icons}>
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
            <CardContent classes={{ root: classNames.content }}>
                <TextField name={`${name}.title`} label={"Загловок"} />
            </CardContent>
        </Card>
    );
};
