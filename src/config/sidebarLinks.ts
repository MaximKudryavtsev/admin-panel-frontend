interface ISidebarLink {
    title: string;
    link: string;
}

export const sidebarLinks: ISidebarLink[] = [
    {
        title: "Хедер",
        link: "/panel/header"
    },
    {
        title: "Навигация",
        link: "/panel/navigation"
    },
    {
        title: "Футер",
        link: "/panel/footer"
    },
    {
        title: "Страницы",
        link: "/panel/pages"
    },
];

export const adminSidebarLinks: ISidebarLink[] = [
    {
        title: "Пользователи",
        link: "/panel/users"
    },
    {
        title: "Журнал",
        link: "/panel/journal"
    },
];
