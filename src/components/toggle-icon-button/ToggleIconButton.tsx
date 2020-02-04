import React from "react";
import ToggleIcon from "material-ui-toggle-icon";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface IToggleIconButtonProps {
    on: boolean;

    onClick?(): void;
}

export const ToggleIconButton = (props: IToggleIconButtonProps) => (
    <IconButton onClick={props.onClick}>
        <ToggleIcon on={props.on} onIcon={<Visibility />} offIcon={<VisibilityOff />} />
    </IconButton>
);
