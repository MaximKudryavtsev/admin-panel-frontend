import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { FieldArray } from "formik";
import { css } from "emotion";
import { IconButton } from "@material-ui/core";
import { IBlock, IImageBlock } from "../../entities";
import { omit, set } from "lodash";
import * as uuid from "uuid";
import { BlockLoadingScreen } from "../block-loading-screen";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MainAchievement } from "./main-achievement";
import { Add } from "@material-ui/icons";

export interface IMainAchievement extends IImageBlock {
    file?: File;
    title: string;
}

export interface IMainAchievementsBlock {
    blocks: IMainAchievement[];
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required("Поле обязательно для заполнения"),
                file: Yup.mixed(),
            }),
        )
    }),
});

const classNames = {
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
    card: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    image: css`
        height: 180px;
    `,
};

export const MainAchievementsBlock = (props: IBlockProps<IMainAchievementsBlock>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IMainAchievementsBlock>>) => {
        if (data.data) {
            set(
                data,
                "data.blocks",
                data.data.blocks?.map((item) => {
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
        <BlockWrapper<IMainAchievementsBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <FieldArray
                        name={"data.blocks"}
                        render={(array) => (
                            <DragDropContext
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                            >
                                <Droppable droppableId={"achievements"} direction={"horizontal"}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <>
                                                <div className={classNames.content}>
                                                    {form?.values.data?.blocks?.map((item, index) => (
                                                        <Draggable
                                                            index={index}
                                                            draggableId={index.toString()}
                                                            key={index}
                                                        >
                                                            {(provided) => (
                                                                <MainAchievement
                                                                    name={`data.blocks.${index}`}
                                                                    achievement={item}
                                                                    innerRef={provided.innerRef}
                                                                    draggableProps={
                                                                        provided.draggableProps
                                                                    }
                                                                    dragHandleProps={
                                                                        provided.dragHandleProps
                                                                    }
                                                                    setFieldValue={form?.setFieldValue}
                                                                    onDelete={() => array.remove(index)}
                                                                />
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                                <IconButton
                                                    onClick={() =>
                                                        array.push({
                                                            title: "",
                                                        })
                                                    }
                                                    color="primary"
                                                >
                                                    <Add />
                                                </IconButton>
                                            </>
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    />
                    {uploaded && <BlockLoadingScreen />}
                </div>
            )}
        />
    );
};
