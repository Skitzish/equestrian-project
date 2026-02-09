export interface Button {
    text: string;
    link?: string; //for navigation
    onClick?: () => void; // for custom actions
    variant?: 'primary' | 'secondary'; //styling
    icon?: string; // optional icon to display
}

export const getMainNavigationButtons = (handleAdvanceDay: () => void) => [
    {
        text: 'Breed Horses',
        link: '/breeding',
        variant: 'secondary' as const,
        icon: '🐴'
    },
    {
        text: 'Barn Chores',
        link: '/chores',
        variant: 'secondary' as const,
        icon: '🧺'
    },
    {
        text: 'Advance Day',
        onClick: handleAdvanceDay,
        variant: 'secondary' as const,
        icon: '→'
    }
];

export const getSecondaryNavButtons: Button[] = [
    {
        text: 'Back to Dashboard',
        link: '/',
        variant: 'secondary' as const,
        icon: '←'
    }
];

export const getTestPageButton: Button[] = [
    {
        text: 'Test Page',
        link: '/testpage',
        variant: 'secondary' as const
    }
];
