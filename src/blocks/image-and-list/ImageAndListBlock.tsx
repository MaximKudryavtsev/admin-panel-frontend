import React, { useState } from "react";
import { IBlock, IImageBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import { getBlockDataWithFiles } from "../../utils";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { DraggablePanel } from "../draggable-panel";
import { BlockLoadingScreen } from "../block-loading-screen";
import * as Yup from "yup";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { Select } from "../../components/select";

enum EImageAndListBlockType {
    DECISION = "decision",
    SERVICE = "service",
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required("Поле обязательно для заполнения"),
                type: Yup.string().required("Поле обязательно для заполнения"),
                link: Yup.string().notRequired(),
                list: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
                file: Yup.mixed(),
            }),
        ),
    }),
});

export interface IImageAndList extends IImageBlockIItem {
    title: string;
    type: string;
    list: string[];
    link?: string;
}

export const ImageAndListBlock = (props: IBlockProps<IImageBlock<IImageAndList>>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IImageBlock<IImageAndList>>>) => {
        data = getBlockDataWithFiles<IImageBlock<IImageAndList>, IImageAndList>(data);

        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IImageBlock<IImageAndList>>
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
                                onAddBlock={() =>
                                    array.push({
                                        title: "",
                                        type: "",
                                        list: [],
                                        link: "",
                                    })
                                }
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.title`}
                                            label={"Имя"}
                                            classes={{
                                                root: css`
                                                    margin-bottom: 24px;
                                                `,
                                            }}
                                        />
                                        <Select
                                            name={`data.blocks.${index}.type`}
                                            label={"Тип"}
                                            classes={{
                                                root: css`
                                                    margin-bottom: 24px;
                                                `,
                                            }}
                                            options={[
                                                {
                                                    value: String(EImageAndListBlockType.DECISION),
                                                    label: "Страница решений",
                                                },
                                                {
                                                    value: String(EImageAndListBlockType.SERVICE),
                                                    label: "Страница услуг",
                                                },
                                            ]}
                                        />
                                        <FieldArray
                                            name={`data.blocks.${index}.list`}
                                            render={(arrayTexts) => (
                                                <>
                                                    {form?.values.data?.blocks &&
                                                        form?.values.data?.blocks[index] &&
                                                        form?.values.data?.blocks[index].list &&
                                                        form?.values.data?.blocks[index].list.map(
                                                            (link, linkIndex) => (
                                                                <div
                                                                    key={linkIndex}
                                                                    className={css`
                                                                        display: flex;
                                                                        align-items: center;
                                                                    `}
                                                                >
                                                                    <TextField
                                                                        name={`data.blocks.${index}.list.${linkIndex}`}
                                                                        textarea
                                                                        label={`Текст ${linkIndex +
                                                                            1}`}
                                                                        classes={{
                                                                            root: css`
                                                                                margin-bottom: 24px;
                                                                            `,
                                                                        }}
                                                                    />
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            arrayTexts.remove(
                                                                                linkIndex,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Delete />
                                                                    </IconButton>
                                                                </div>
                                                            ),
                                                        )}
                                                    <IconButton onClick={() => arrayTexts.push("")}>
                                                        <Add />
                                                    </IconButton>
                                                </>
                                            )}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.link`}
                                            label={"Ссылка"}
                                            classes={{
                                                root: css`
                                                    margin-bottom: 24px;
                                                `,
                                            }}
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
