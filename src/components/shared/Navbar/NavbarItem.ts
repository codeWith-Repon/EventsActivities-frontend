

export const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore Events', href: '/events' },
    {
        label: 'Communities',
        submenu: [
            { label: 'Hiking', href: '/community/hiking' },
            { label: 'Music ', href: '/community/music' },
            { label: 'Dining', href: '/community/dining' },
        ],
    },
    { label: 'About', href: '/about' },
];