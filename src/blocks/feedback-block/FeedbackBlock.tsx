import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { FieldArray } from "formik";
import { IBlock, IImageBlockIItem } from "../../entities";
import { BlockLoadingScreen } from "../block-loading-screen";
import { DraggablePanel } from "../draggable-panel";
import { getBlockDataWithFiles } from "../../utils";

export interface IFeedbackBlock {
    title: string;
    blocks: IFeedback[];
}

export interface IFeedback extends IImageBlockIItem {
    text: string;
    name: string;
    position: string;
}

const validationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        blocks: Yup.array().of(
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
    field: css`
        margin-bottom: 24px;
    `,
};

export const FeedbackBlock = (props: IBlockProps<IFeedbackBlock>) => {
    const { onSubmit } = props;
    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IFeedbackBlock>>) => {
        data = getBlockDataWithFiles<IFeedbackBlock, IFeedback>(data);
        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IFeedbackBlock>
            {...props}
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
                        name={"data.blocks"}
                        render={(array) => (
                            <DraggablePanel
                                data={form?.values.data?.blocks}
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                                setFieldValue={form?.setFieldValue}
                                onDelete={array.remove}
                                onAddBlock={() =>
                                    array.push({
                                        text: "",
                                        name: "",
                                        position: "",
                                    })
                                }
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.text`}
                                            label={"Текст отзыва"}
                                            textarea
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.name`}
                                            label={"Имя"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.position`}
                                            label={"Должность"}
                                            classes={{ root: classNames.field }}
                                        />
                                    </>
                                )}
                            />
                        )}
                    />
                    {uploaded && <BlockLoadingScreen />}
                </div>
            )}
        />
    );
};
