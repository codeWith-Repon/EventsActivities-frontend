

export const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore Events', href: '/events' },
    {
        label: 'Communities',
        submenu: [
            { label: 'Hiking & Outdoors', href: '/community/hiking-outdoors' },
            { label: 'Music & Concerts', href: '/community/music-concerts' },
            { label: 'Food & Dining', href: '/community/food-dining' },
        ],
    },
    { label: 'About', href: '/about' },
];