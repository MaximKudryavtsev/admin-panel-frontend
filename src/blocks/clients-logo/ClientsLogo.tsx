import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import { ILogo, Logo } from "./logo";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { css } from "emotion";
import { FieldArray } from "formik";
import { BlockLoadingScreen } from "../block-loading-screen";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Add } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const classNames = {
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
};

const validationSchema = Yup.object().shape({
    data: Yup.array().of(
        Yup.object().shape({
            colorlessFile: Yup.mixed<File>().required("Обязательно для заполнения"),
            coloredFile: Yup.mixed<File>().required("Обязательно для заполнения"),
            colorlessLink: Yup.string().notRequired(),
            coloredLink: Yup.string().notRequired(),
        }),
    ),
});

export const ClientsLogo = (props: IBlockProps<ILogo[]>) => {
    const { block, statuses, onSubmit, onDelete } = props;
    const [uploaded, setUploaded] = useState(false);

    return (
        <BlockWrapper<ILogo[]>
            block={block}
            statuses={statuses}
            onDelete={onDelete}
            onSubmit={(id, data) => console.log(data)}
            validationSchema={validationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <FieldArray
                        name={"data"}
                        render={(array) => (
                            <DragDropContext
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                            >
                                <Droppable droppableId={"clientsLogo"} direction={"horizontal"}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <div className={classNames.content}>
                                                {form?.values?.data?.map((item, index) => (
                                                    <Draggable
                                                        index={index}
                                                        key={index}
                                                        draggableId={index.toString()}
                                                    >
                                                        {(provided) => (
                                                            <Logo
                                                                name={`data.${index}`}
                                                                logo={item}
                                                                innerRef={provided.innerRef}
                                                                onDelete={() => array.remove(index)}
                                                                dragHandleProps={
                                                                    provided.dragHandleProps
                                                                }
                                                                draggableProps={
                                                                    provided.draggableProps
                                                                }
                                                                setFieldValue={form?.setFieldValue}
                                                            />
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                            <IconButton
                                                onClick={() =>
                                                    array.push({
                                                        colorlessLink: "",
                                                        coloredLink: "",
                                                    })
                                                }
                                                color="primary"
                                            >
                                                <Add />
                                            </IconButton>
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