import React, { useEffect, useMemo, useState } from "react";
import { TLang } from "../../entities";
import { Transport } from "../../transport";
import { useFilter } from "../../hooks";
import { LanguageTab } from "../../widgets/language-tab";
import { FilterPanel } from "../../widgets/filter-panel";

interface IFiltersProps {
    defaultLang: TLang;

    setPageTitle(title: string): void;
}

export const Filters = (props: IFiltersProps) => {
    const { defaultLang, setPageTitle } = props;
    const [language, setLanguage] = useState<TLang>(defaultLang);
    const transport = useMemo(() => Transport.create(), []);
    const { filter, filters, createFilter, deleteFilterPack, getFilter, updateFilter, deleteFilter } = useFilter(
        transport,
        language,
    );

    useEffect(() => setPageTitle("Фильтры"), [setPageTitle]);
    useEffect(() => setLanguage(defaultLang), [defaultLang]);

    return (
        <LanguageTab>
            <FilterPanel
                lang={"ru"}
                setLanguage={setLanguage}
                filter={filter}
                filters={filters}
                createFilter={createFilter}
                getFilter={getFilter}
                updateFilter={updateFilter}
                deleteFilterPack={deleteFilterPack}
                deleteFilter={deleteFilter}
            />
            <FilterPanel
                lang={"en"}
                setLanguage={setLanguage}
                filter={filter}
                filters={filters}
                createFilter={createFilter}
                getFilter={getFilter}
                updateFilter={updateFilter}
                deleteFilterPack={deleteFilterPack}
                deleteFilter={deleteFilter}
            />
        </LanguageTab>
    )
};
