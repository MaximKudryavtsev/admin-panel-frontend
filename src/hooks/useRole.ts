import { useContext } from "react";
import { UserContext } from "../app/App";
import { EUserRoles, IDictionary } from "../entities";

export function useRole(): {
    roles: IDictionary[];
    hasRole: (label: EUserRoles) => boolean | undefined;
} {
    const user = useContext(UserContext);

    const hasRole = (roleLabel: string) => {
        return user && !!user.roles.find((item) => item.label === roleLabel);
    };

    return { roles: user?.roles ?? [], hasRole };
}
