import { TLang, TResponse } from "../entities";
import { useCallback, useMemo } from "react";
import { Transport } from "../transport";
import { AdminAPI } from "../api";
import { IUseContacts, useContacts } from "./useContacts";

export function useAdmin(): {
    updateBlog: (lang: TLang) => Promise<TResponse<void>>;
    useContacts: () => IUseContacts;
} {
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const updateBlog = useCallback((lang: TLang) => AdminAPI.updateBlog(transport, lang), [
        transport,
    ]);

    return { updateBlog, useContacts };
}
