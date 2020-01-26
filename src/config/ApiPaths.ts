export const ApiPaths = {
    SIGN_IN: "login/sign-in",
    UPDATE_TOKEN: "login/update-token",
    FORGOT_PASSWORD: "login/forgot-password",
    GET_USER: "user/get",
    UPDATE_USER: "user/update",
    UPDATE_PASSWORD: "user/update-password",
    DELETE_USER: "user/delete",
    UPDATE_AVATAR: "user/avatar/update",
    DELETE_AVATAR: "user/avatar/delete",
    // navigation
    GET_NAVIGATION: "/navigations/:id",
    GET_NAVIGATION_TYPES: "/navigations/types",
    GET_NAVIGATION_LIST: "/navigations/list",
    UPDATE_NAVIGATION: "/navigations/:id/update",
    CREATE_NAVIGATION: "/navigations/create",
    REORDER_NAVIGATION: "/navigations/reorder",
    DELETE_NAVIGATION: "/navigations/:id/delete",
    // pages
    CREATE_PAGE: "/page/create",
    GET_PAGE_LIST: "/page/list",
    GET_PAGE: "/page/:id",
    GET_PAGE_STATUSES: "/page/statuses",
};
