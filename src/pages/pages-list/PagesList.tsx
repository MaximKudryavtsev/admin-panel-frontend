import React, { useEffect } from "react";
import { TableWrapper } from "../../widgets/table-wrapper";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { css } from "emotion";

interface IPageListProps {
    setPageTitle(title: string): void;
}

const classNames = {
    headCell: css`
        font-weight: 600 !important;
    `,
    bodyRow: css`
        cursor: pointer;
        :hover {
            background: rgba(0, 0, 0, 0.04);
        }
    `
};

export const PagesList = (props: IPageListProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Страницы"), [setPageTitle]);

    return (
        <TableWrapper>
            <Paper>
                <Table classes={{root: css`table-layout: fixed;`}}>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{root: classNames.headCell}}>Автор</TableCell>
                            <TableCell classes={{root: classNames.headCell}}>Название</TableCell>
                            <TableCell classes={{root: classNames.headCell}}>Статус</TableCell>
                            <TableCell classes={{root: classNames.headCell}}>Последнее изменение</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow classes={{root: classNames.bodyRow}}>
                            <TableCell>Автор</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Последнее изменение</TableCell>
                        </TableRow>
                        <TableRow classes={{root: classNames.bodyRow}}>
                            <TableCell>Автор</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Последнее изменение</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </TableWrapper>
    );
};
