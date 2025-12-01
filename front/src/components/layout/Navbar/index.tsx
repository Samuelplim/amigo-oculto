import { Link } from '@tanstack/react-router';
import { FaHome, FaUsers, FaGifts, FaPen } from 'react-icons/fa';
import { NavItem } from '../../ui/NavBar/NavItem';
import { useSession } from '../../provider/session-provider';

export const Navbar = () => {
    const { data } = useSession();
    const navDesktopLinks = data?.user.isAdmin
        ? [
              { href: '/', label: 'Inicio', icon: FaHome },
              { href: '/participantes', label: 'Participantes', icon: FaUsers },
              { href: '/evento', label: 'Evento', icon: FaPen },
              { href: '/presentes', label: 'Presentes', icon: FaGifts },
          ]
        : [
              { href: '/', label: 'Inicio', icon: FaHome },
              { href: '/presentes', label: 'Presentes', icon: FaGifts },
              { href: '/participantes', label: 'Participantes', icon: FaUsers },
          ];
    /*     const navMobileLinks = [
        { href: '/', label: 'Inicio', icon: FaHome },
        { href: '/presentes', label: 'Presentes', icon: FaGifts },
        { href: '/participantes', label: 'Participantes', icon: FaUsers },
    ]; */
    return (
        <>
            {/* Desktop Header */}
            <header className="py-2 sticky top-0 z-50 hidden md:block">
                <div className="lg:px-32 md:px-16 px-8 flex justify-between items-center">
                    <img
                        src="/amigo-oculto.svg"
                        alt="Icone do site com a sigla VAT."
                        loading="eager"
                        className="h-12 w-12"
                    />
                    {/* Desktop Nav using NavItem */}
                    <nav>
                        <ul className="flex space-x-8">
                            {navDesktopLinks.map((link) => (
                                <NavItem key={link.href} href={link.href} title={link.label} />
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Mobile Bottom Tabs Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 border-t z-50 md:hidden">
                <ul className="flex justify-around items-center h-16">
                    {navDesktopLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <li key={link.href} className="flex-1">
                                <Link
                                    to={link.href}
                                    className="flex flex-col items-center justify-center h-full gap-1 transition-colors relative"
                                    activeProps={{
                                        className: 'font-semibold relative',
                                    }}
                                >
                                    <Icon className="text-xl" />
                                    <span className="text-xs">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};
