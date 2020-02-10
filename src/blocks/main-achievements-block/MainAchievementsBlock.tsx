import React, { useState } from "react";
import { IBlockProps } from "../IBlockProps";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { FieldArray } from "formik";
import { css } from "emotion";
import { IBlock, IImageBlock } from "../../entities";
import { omit, set } from "lodash";
import * as uuid from "uuid";
import { BlockLoadingScreen } from "../block-loading-screen";
import { TextField } from "../../components/text-field";
import { DraggablePanel } from "../draggable-panel";

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
        ),
    }),
});

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
                            <DraggablePanel
                                data={form?.values.data?.blocks}
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                                setFieldValue={form?.setFieldValue}
                                onDelete={array.remove}
                                onAddBlock={() => array.push({title: ""})}
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
