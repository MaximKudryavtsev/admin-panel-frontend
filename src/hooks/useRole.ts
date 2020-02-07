import { useContext } from "react";
import { RoleContext } from "../app/App";
import { EUserRoles, IDictionary } from "../entities";

export function useRole(): {
    roles: IDictionary[];
    hasRole: (label: EUserRoles) => boolean;
} {
    const roles = useContext(RoleContext);

    const hasRole = (roleLabel: string) => {
        return roles && !!roles.find((item) => item.label === roleLabel);
    };

    return { roles, hasRole };
}
