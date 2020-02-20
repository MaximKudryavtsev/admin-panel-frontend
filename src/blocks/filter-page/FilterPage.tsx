import React, { useEffect, useMemo, useState } from "react";
import { EPageType, IBlock, IImageBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { getBlockDataWithFiles } from "../../utils";
import * as Yup from "yup";
import { useFilter, usePageList } from "../../hooks";
import { Transport } from "../../transport";
import { css } from "emotion";
import { Select } from "../../components/select";
import { BlockLoadingScreen } from "../block-loading-screen";
import { FieldArray } from "formik";
import { DraggablePanel } from "../draggable-panel";
import { TextField } from "../../components/text-field";

export interface IFilterBlockItem extends IImageBlockIItem {
    title: string;
    description: string;
    filters: string[];
    link: string;
}

export interface IFilterBlockPage extends IImageBlock<IFilterBlockItem> {
    filterId: string;
}

const validationSchema = Yup.object().shape({
    data: Yup.object().shape({
        filterId: Yup.string().required("Поле обязательно для заполнения"),
        blocks: Yup.array().of(
            Yup.object().shape({
                file: Yup.mixed(),
                visible: Yup.boolean(),
                title: Yup.string().required("Поле обязательно для заполнения"),
                description: Yup.string().required("Поле обязательно для заполнения"),
                filters: Yup.string().required("Поле обязательно для заполнения"),
                link: Yup.string().required("Поле обязательно для заполнения"),
            }),
        ),
    }),
});

const classNames = {
    field: css`
        margin-bottom: 24px;
    `,
};

export const FilterPage = (props: IBlockProps<IFilterBlockPage>) => {
    const { onSubmit, lang = "ru", block } = props;
    const [uploaded, setUploaded] = useState(false);
    const transport = useMemo(() => Transport.create(), []);
    const { filters, filter, getFilter } = useFilter(transport, lang);
    const { pages } = usePageList(transport, lang, EPageType.CASE);

    const handleSubmit = (id: string, data: Partial<IBlock<IFilterBlockPage>>) => {
        data = getBlockDataWithFiles<IFilterBlockPage, IFilterBlockItem>(data);
        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    useEffect(() => {
        if (block && block.data && block.data.filterId) {
            getFilter(block.data.filterId);
        }
    }, [block, getFilter]);

    return (
        <BlockWrapper<IFilterBlockPage>
            {...props}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <Select
                        name={"data.filterId"}
                        options={filters.map((item) => ({ value: item._id, label: item.title }))}
                        label={"Список фильтров"}
                        classes={{ root: classNames.field }}
                        onChange={getFilter}
                    />
                    <FieldArray
                        name={"data.blocks"}
                        render={(array) => (
                            <DraggablePanel
                                variant={"portfolio"}
                                data={form?.values.data?.blocks}
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                                wrapperClassname={css`grid-template-columns: 1fr 1fr;`}
                                setFieldValue={form?.setFieldValue}
                                onDelete={array.remove}
                                onAddBlock={() =>
                                    array.push({
                                        title: "",
                                        description: "",
                                        visible: true,
                                        filters: [],
                                    })
                                }
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.title`}
                                            label={"Название кейса"}
                                            textarea
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.description`}
                                            label={"Описание"}
                                            classes={{ root: classNames.field }}
                                            textarea
                                        />
                                        {filter && (
                                            <Select
                                                name={`data.blocks.${index}.filters`}
                                                multiple
                                                disable={!filter}
                                                label={"Фильтры"}
                                                options={filter?.filters?.map((item) => ({
                                                    value: item._id,
                                                    label: item.title,
                                                }))}
                                                classes={{ root: classNames.field }}
                                            />
                                        )}
                                        <Select
                                            name={`data.blocks.${index}.link`}
                                            label={"Ссылка"}
                                            options={pages.map((item) => ({
                                                value: item._id,
                                                label: item.title,
                                            }))}
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
