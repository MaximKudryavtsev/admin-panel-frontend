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
import { IBlock } from "../../entities";
import { set, omit } from "lodash";
import * as uuid from "uuid";

const classNames = {
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
};

interface ILogoBlock {
    blocks: ILogo[];
}

const validationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.array().of(
            Yup.object().shape({
                colorlessLink: Yup.string().notRequired(),
                coloredLink: Yup.string().notRequired(),
                coloredFile: Yup.mixed<File>().when("coloredLink", {
                    is: (o: string | undefined) => o ? o.length > 0 : false,
                    then: Yup.mixed<File>().notRequired(),
                    otherwise: Yup.mixed<File>().required("Обязательно для заполнения")
                }),
                colorlessFile: Yup.mixed<File>().when("colorlessLink", {
                    is: (o: string | undefined) => o ? o.length > 0 : false,
                    then: Yup.mixed<File>().notRequired(),
                    otherwise: Yup.mixed<File>().required("Обязательно для заполнения")
                }),
                visible: Yup.boolean()
            }),
        )
    }),
});

export const ClientsLogo = (props: IBlockProps<ILogoBlock>) => {
    const { onSubmit } = props;
    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<ILogoBlock>>) => {
        data.data?.blocks?.map((item) => {
            item.id = item.id ? item.id : uuid.v4();
            if (item.coloredFile) {
                set(data, `${item.id}coloredFile`, item.coloredFile);
            }
            if (item.colorlessFile) {
                set(data, `${item.id}colorlessFile`, item.colorlessFile);
            }
            delete item.colorlessFile;
            delete item.coloredFile;
            return omit(item, ["coloredFile", "colorlessFile"]);
        });
        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<ILogoBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
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
                                <Droppable droppableId={"clientsLogo"} direction={"horizontal"}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <div className={classNames.content}>
                                                {form?.values?.data?.blocks?.map((item, index) => (
                                                    <Draggable
                                                        index={index}
                                                        key={index}
                                                        draggableId={index.toString()}
                                                    >
                                                        {(provided) => (
                                                            <Logo
                                                                name={`data.blocks.${index}`}
                                                                logo={item}
                                                                innerRef={provided.innerRef}
                                                                onDelete={() => array.remove(index)}
                                                                dragHandleProps={provided.dragHandleProps}
                                                                draggableProps={provided.draggableProps}
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
                                                        visible: true
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
