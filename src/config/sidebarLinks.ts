interface ISidebarLink {
    title: string;
    link: string;
}

export const sidebarLinks: ISidebarLink[] = [
    {
        title: "Хедер",
        link: "/header"
    },
    {
        title: "Навигация",
        link: "/navigation"
    },
    {
        title: "Футер",
        link: "/footer"
    },
    {
        title: "Страницы",
        link: "/pages"
    },
];

export const adminSidebarLinks: ISidebarLink[] = [
    {
        title: "Пользователи",
        link: "/users"
    },
    {
        title: "Журнал",
        link: "/journal"
    },
];
