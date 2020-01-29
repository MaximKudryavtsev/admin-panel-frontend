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
    GET_NAVIGATION: "/navigation/:id",
    GET_NAVIGATION_TYPES: "/navigation/types",
    GET_NAVIGATION_LIST: "/navigation/list",
    UPDATE_NAVIGATION: "/navigation/:id/update",
    CREATE_NAVIGATION: "/navigation/create",
    REORDER_NAVIGATION: "/navigation/reorder",
    DELETE_NAVIGATION: "/navigation/:id/delete",
    GET_INTERNAL_PAGES_LIST: "/navigation/pages",
    // pages
    CREATE_PAGE: "/page/create",
    GET_PAGE_LIST: "/page/list",
    PAGE: "/page/:id",
    GET_PAGE_STATUSES: "/page/statuses",
    GET_PAGE_AUTHOR: "/page/:id/author",
    //block
    GET_BLOCK_TYPES: "/block/types",
    CREATE_BLOCK: "/block/create",
    BLOCK: "/block"
};
