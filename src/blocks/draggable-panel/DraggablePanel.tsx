import React, { ReactNode } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { DraggableImageBlock } from "../draggable-image-block";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { IImageBlockIItem } from "../../entities";
import { css } from "emotion";

interface IDraggablePanelProps<T> {
    data?: T[];
    variant?: "default" | "achievement" | "portfolio";
    wrapperClassname?: string;

    onAddBlock?(): void;

    onDragEnd(result: DropResult): void;

    render(index: number): ReactNode;

    onDelete(index: number): void;

    setFieldValue?(field: string, value: any, shouldValidate?: boolean): void;
}

const classNames = {
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
};

export const DraggablePanel = <T extends IImageBlockIItem>(props: IDraggablePanelProps<T>) => {
    const {
        onAddBlock,
        onDragEnd,
        render,
        data = [],
        onDelete,
        setFieldValue,
        variant = "default",
        wrapperClassname
    } = props;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"blocks"} direction={"horizontal"}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <React.Fragment>
                            <div className={css([variant === "default" && classNames.content, wrapperClassname])}>
                                {data.map((item, index) => (
                                    <Draggable
                                        index={index}
                                        draggableId={index.toString()}
                                        key={index}
                                    >
                                        {(provided) => (
                                            <DraggableImageBlock
                                                name={`data.blocks.${index}`}
                                                data={item}
                                                variant={variant}
                                                dragHandleProps={provided.dragHandleProps}
                                                draggableProps={provided.draggableProps}
                                                innerRef={provided.innerRef}
                                                setFieldValue={setFieldValue}
                                                onDelete={() => onDelete(index)}
                                                render={() => render(index)}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            <IconButton onClick={onAddBlock} color="primary">
                                <Add />
                            </IconButton>
                        </React.Fragment>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
