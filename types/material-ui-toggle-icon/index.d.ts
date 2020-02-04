declare module "material-ui-toggle-icon" {
    import { ReactNode } from "react";

    interface Props {
        on: boolean;
        onIcon: ReactNode;
        offIcon: ReactNode;
    }

    export default function ToggleIcon(props: Props);
}

