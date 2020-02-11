import React, { useState } from "react";
import { IBlock, IImageBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import { getBlockDataWithFiles } from "../../utils";
import * as Yup from "yup";
import { css } from "emotion";
import { FieldArray } from "formik";
import { DraggablePanel } from "../draggable-panel";
import { TextField } from "../../components/text-field";
import { BlockLoadingScreen } from "../block-loading-screen";
import { BlockWrapper } from "../../widgets/block-wrapper";

export interface ITeam extends IImageBlockIItem {
    name: string;
    position: string;
}

export interface ITeamBlock extends IImageBlock<ITeam> {
    title: string;
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        blocks: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Поле обязательно для заполнения"),
                position: Yup.string().required("Поле обязательно для заполнения"),
                file: Yup.mixed(),
            }),
        ),
    }),
});

export const TeamBlock = (props: IBlockProps<ITeamBlock>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<ITeamBlock>>) => {
        data = getBlockDataWithFiles<ITeamBlock, ITeam>(data);

        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<ITeamBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <TextField
                        name={`data.title`}
                        label={"Заголовок"}
                        classes={{root: css`margin-bottom: 24px;`}}
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
                                onAddBlock={() => array.push({title: ""})}
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.name`}
                                            label={"Имя"}
                                            classes={{root: css`margin-bottom: 24px;`}}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.position`}
                                            label={"Вакансия"}
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
