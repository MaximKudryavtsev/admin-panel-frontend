import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { FieldArray } from "formik";
import { Feedback, IFeedback } from "./feedback";
import { Add } from "@material-ui/icons";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import { IBlock } from "../../entities";
import { set, omit } from "lodash";
import * as uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface IFeedbackBlock {
    title: string;
    feedbacks: IFeedback[];
}

const validationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        feedbacks: Yup.array().of(
            Yup.object().shape({
                file: Yup.mixed(),
                text: Yup.string().required("Поле обязательно для заполнения"),
                name: Yup.string().required("Поле обязательно для заполнения"),
                position: Yup.string().required("Поле обязательно для заполнения"),
            }),
        ),
    }),
});

const classNames = {
    title: css`
        margin-bottom: 24px;
    `,
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
    loadingScreen: css`
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
};

export const FeedbackBlock = (props: IBlockProps<IFeedbackBlock>) => {
    const { block, onDelete, onSubmit, statuses } = props;
    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IFeedbackBlock>>) => {
        if (data.data?.feedbacks) {
            set(
                data,
                "data.feedbacks",
                data.data?.feedbacks.map((item) => {
                    item.id = item.id ? item.id : uuid.v4();
                    if (item.file) {
                        set(data, `${item.id}`, item.file);
                    }
                    return omit(item, ["file"]);
                }),
            );
        }
        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IFeedbackBlock>
            block={block}
            statuses={statuses}
            onDelete={onDelete}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            disabled={uploaded}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <TextField
                        name={"data.title"}
                        label={"Заголовок"}
                        classes={{ root: classNames.title }}
                    />
                    <FieldArray
                        name={"data.feedbacks"}
                        render={(array) => (
                            <DragDropContext
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                            >
                                <Droppable droppableId={"feedbacks"} direction={"horizontal"}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <React.Fragment>
                                                <div className={classNames.content}>
                                                    {form?.values?.data?.feedbacks?.map(
                                                        (item, index) => (
                                                            <Draggable
                                                                index={index}
                                                                draggableId={index.toString()}
                                                                key={index}
                                                            >
                                                                {(provided) => (
                                                                    <Feedback
                                                                        innerRef={provided.innerRef}
                                                                        dragHandleProps={
                                                                            provided.dragHandleProps
                                                                        }
                                                                        draggableProps={
                                                                            provided.draggableProps
                                                                        }
                                                                        name={`data.feedbacks.${index}`}
                                                                        feedback={item}
                                                                        onDelete={() =>
                                                                            array.remove(index)
                                                                        }
                                                                        setFieldValue={
                                                                            form?.setFieldValue
                                                                        }
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        ),
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                                <IconButton
                                                    onClick={() =>
                                                        array.push({
                                                            text: "",
                                                            name: "",
                                                            position: "",
                                                        })
                                                    }
                                                    color="primary"
                                                >
                                                    <Add />
                                                </IconButton>
                                            </React.Fragment>
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    />
                    {uploaded && (
                        <div className={classNames.loadingScreen}>
                            <CircularProgress color="primary" />
                            <Typography
                                className={css`
                                    margin-left: 24px;
                                `}
                                variant={"h6"}
                                color={"primary"}
                            >
                                Загрузка...
                            </Typography>
                        </div>
                    )}
                </div>
            )}
        />
    );
};
