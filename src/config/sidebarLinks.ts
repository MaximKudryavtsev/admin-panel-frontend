interface ISidebarLink {
    title: string;
    link: string;
}

export const sidebarLinks: ISidebarLink[] = [
    {
        title: "Главная",
        link: "/main"
    },
    {
        title: "Фильтры",
        link: "/filters"
    },
    {
        title: "Хедер",
        link: "/header"
    },
    {
        title: "Контакты",
        link: "/contacts"
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
    {
        title: "Кейсы",
        link: "/cases"
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
