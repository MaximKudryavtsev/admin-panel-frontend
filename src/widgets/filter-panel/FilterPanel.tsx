import React, { useEffect, useState } from "react";
import { IFilter, TCreateFilterRequest, TLang } from "../../entities";
import { css } from "emotion";
import { Fab, IconButton, Paper, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { ConfirmPopup } from "../../components/confirm-popup";
import { FilterPopup } from "../filter-popup";

interface IFilterPanelProps {
    lang: TLang;
    filters?: IFilter[];
    filter?: IFilter;

    createFilter?(data: TCreateFilterRequest): Promise<void>;

    getFilter?(id: string): Promise<void>;

    updateFilter?(id: string, data: Partial<IFilter>): Promise<void>;

    deleteFilter?(id: string): Promise<void>;

    setLanguage(language: TLang): void;
}

const classNames = {
    content: css`
        margin-bottom: 24px;
        width: 600px;
    `,
    contacts: css`
        margin: 24px 0;
    `,
    item: css`
        display: flex;
        width: 100%;
        padding: 5px 10px 5px 20px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 0;
        :first-child {
            border-radius: 4px 4px 0 0 !important;
        }
        :last-child {
            border-radius: 0 0 4px 4px !important;
            border-bottom: none;
        }
    `,
    icons: css`
        margin-left: auto;
    `,
    icon: css`
        margin-right: 24px;
    `,
    type: css`
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
    `,
};

export const FilterPanel = (props: IFilterPanelProps) => {
    const {
        lang,
        filter,
        filters = [],
        createFilter,
        deleteFilter,
        getFilter,
        setLanguage,
        updateFilter,
    } = props;
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentId, setCurrentId] = useState<string | undefined>(undefined);

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    const handleGetFilter = (id: string) => {
        if (getFilter) {
            getFilter(id).then(() => setUpdate(true));
        }
    };

    const onDeleteOpen = (id: string) => {
        setDeleteModal(true);
        setCurrentId(id);
    };

    const handleDelete = () => {
        if (deleteFilter && currentId) {
            deleteFilter(currentId).then(() => setDeleteModal(false));
        }
    };

    const handleCreate = (data: IFilter) => {
        if (createFilter) {
            createFilter({...data, lang}).then(() => setCreate(false));
        }
    };

    const handleUpdate = (data: Partial<IFilter>) => {
        if (updateFilter && data._id) {
            updateFilter(data._id, {...data}).then(() => setUpdate(false));
        }
    };

    return (
        <div>
            <div className={classNames.content}>
                <div className={classNames.contacts}>
                    {filters.map((item) => (
                        <Paper className={classNames.item} key={item._id}>
                            <Typography>{item.title}</Typography>
                            <div className={classNames.icons}>
                                <IconButton onClick={() => handleGetFilter(item._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => onDeleteOpen(item._id)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </div>
                <Fab color="primary" aria-label="add" onClick={() => setCreate(true)}>
                    <Add />
                </Fab>
            </div>
            <ConfirmPopup
                title={"Вы действительно хотите удалть фильтр?"}
                submitTitle={"Удалить"}
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onSubmit={handleDelete}
            />
            <FilterPopup
                title={"Добавить фильтр"}
                open={create}
                onClose={() => setCreate(false)}
                onSubmit={handleCreate}
            />
            <FilterPopup
                title={"Редактировать фильтр"}
                open={update}
                filter={filter}
                onClose={() => setUpdate(false)}
                onSubmit={handleUpdate}
            />
        </div>
    );
};
