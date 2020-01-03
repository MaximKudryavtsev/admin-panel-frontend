interface ISidebarLink {
    title: string;
    link: string;
}

export const sidebarLinks: ISidebarLink[] = [
    {
        title: "Навигация",
        link: "/panel/navigation"
    },
    {
        title: "Футер",
        link: "/panel/footer"
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
