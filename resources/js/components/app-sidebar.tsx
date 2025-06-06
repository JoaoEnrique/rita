import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ScrollText,Clipboard, HandHeart, Github, ShoppingCart } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Home',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Meus agendamentos',
        href: '/appointments',
        icon: Clipboard,
    },
    {
        title: 'Agendar',
        href: '/appointments/new',
        icon: ScrollText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Planos',
        href: '/plans',
        icon: ShoppingCart,
    },
    {
        title: 'Contribua no Github',
        href: 'https://github.com/JoaoEnrique/rita',
        icon: Github,
    },
    {
        title: 'Documentação',
        href: 'https://github.com/JoaoEnrique/rita/blob/main/README.md',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
