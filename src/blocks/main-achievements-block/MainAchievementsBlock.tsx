import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { FieldArray } from "formik";
import { css } from "emotion";
import { IBlock, IImageBlockIItem } from "../../entities";
import { BlockLoadingScreen } from "../block-loading-screen";
import { TextField } from "../../components/text-field";
import { DraggablePanel } from "../draggable-panel";
import { getBlockDataWithFiles } from "../../utils";

export interface IMainAchievement extends IImageBlockIItem {
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
                visible: Yup.boolean(),
            }),
        ),
    }),
});

export const MainAchievementsBlock = (props: IBlockProps<IMainAchievementsBlock>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IMainAchievementsBlock>>) => {
        data = getBlockDataWithFiles<IMainAchievementsBlock, IMainAchievement>(data);
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
                            <DraggablePanel
                                data={form?.values.data?.blocks}
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                                setFieldValue={form?.setFieldValue}
                                onDelete={array.remove}
                                onAddBlock={() => array.push({title: "", visible: true })}
                                render={(index) => (
                                    <TextField
                                        name={`data.blocks.${index}.title`}
                                        label={"Загловок"}
                                    />
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
