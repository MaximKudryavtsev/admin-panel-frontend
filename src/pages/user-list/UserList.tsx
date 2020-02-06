import React, { useEffect, useMemo, useState } from "react";
import { TableWrapper } from "../../widgets/table-wrapper";
import { Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { css } from "emotion";
import { useUsers } from "../../hooks/user";
import { Transport } from "../../transport";
import { AddUserPopup } from "../../widgets/add-user-popup";
import { TCreateUserRequest } from "../../entities";
import { useCustomSnackbar } from "../../hooks";
import { getServerError } from "../../utils";

interface IUserListProps {
    setPageTitle(title: string): void;
}

const classNames = {
    table: css`
        table-layout: fixed;
    `,
    headCell: css`
        font-weight: 600 !important;
    `,
    bodyRow: css`
        cursor: pointer;
        :hover {
            background: rgba(0, 0, 0, 0.04);
        }
    `,
};

export const UserList = (props: IUserListProps) => {
    const { setPageTitle } = props;
    const transport = useMemo(() => Transport.create(), []);
    const [modalOpen, setModalOpen] = useState(false);
    const { users, user, getUser, createUser, roles } = useUsers(transport);
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

    useEffect(() => setPageTitle("Пользователи"), [setPageTitle]);

    function onModalOpen(): void {
        setModalOpen(true);
    }

    function onModalClose(): void {
        setModalOpen(false);
    }

    const handleCreate = (data: TCreateUserRequest) => {
        createUser(data)
            .then(() => {
                showSuccessSnackbar("Создано");
                onModalClose();
            })
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <>
            <TableWrapper handler={onModalOpen}>
                <Paper>
                    <Table classes={{ root: classNames.table }}>
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{ root: classNames.headCell }}>Логин</TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>E-mail</TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>Роли</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((item) => (
                                <TableRow key={item._id} classes={{ root: classNames.bodyRow }}>
                                    <TableCell classes={{ root: classNames.headCell }}>
                                        {item?.login || ""}
                                    </TableCell>
                                    <TableCell classes={{ root: classNames.headCell }}>
                                        {item.email}
                                    </TableCell>
                                    <TableCell classes={{ root: classNames.headCell }}>
                                        {item.roles.map((role) => (
                                            <Chip
                                                key={role._id}
                                                variant="outlined"
                                                size="small"
                                                label={role.title}
                                                className={css`
                                                    margin-right: 10px;
                                                `}
                                            />
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </TableWrapper>
            {modalOpen && (
                <AddUserPopup
                    open={modalOpen}
                    onClose={onModalClose}
                    roles={roles}
                    onSubmit={handleCreate}
                />
            )}
        </>
    );
};
