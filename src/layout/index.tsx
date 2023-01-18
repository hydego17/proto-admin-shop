import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
import { AppShell, Navbar, Header, Footer, MediaQuery, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as TB from 'react-icons/tb';
import { cx } from '@/utils/cx';

const navbarAtom = atom(false);

const navLinks = [
  { label: 'Products', href: '/products', Icon: TB.TbLayoutGrid },
  { label: 'Carts', href: '/carts', Icon: TB.TbShoppingCart },
];

const AppNavbar = () => {
  const router = useRouter();
  const activePage = router.asPath;

  const [navbarOpened, toggleNavbar] = useAtom(navbarAtom);

  const isDesktop = useMediaQuery('(min-width:1024px)');

  useEffect(() => {
    if (isDesktop) {
      toggleNavbar(false);
    }
  }, [isDesktop, toggleNavbar]);

  return (
    <Navbar hiddenBreakpoint='sm' hidden={!navbarOpened} width={{ sm: 200, lg: 300 }} className='px-2 py-4'>
      <Navbar.Section grow>
        <div>
          {navLinks.map(({ href, Icon, label }) => {
            const active = href === activePage || activePage.includes(href);
            return (
              <Link key={href} href={href} legacyBehavior>
                <a
                  onClick={() => toggleNavbar(false)}
                  className={cx(
                    'flex items-center gap-3 p-3 rounded',
                    active ? 'bg-violet-500 text-white' : 'hover:bg-slate-100'
                  )}
                >
                  <Icon size={20} />
                  <span className='font-medium truncate'>{label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

const AppHeader = () => {
  const [navbarOpened, toggleNavbar] = useAtom(navbarAtom);

  return (
    <Header height={{ base: 50, md: 70 }} p='md'>
      <div className='h-full flex items-center '>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger opened={navbarOpened} onClick={() => toggleNavbar((o) => !o)} size='sm' mr='lg' />
        </MediaQuery>

        <div className='font-bold text-xl lg:text-2xl'>Shopping Admin</div>
      </div>
    </Header>
  );
};

const AppFooter = () => {
  return (
    <Footer height={{ base: 40, md: 50 }}>
      <div className='h-full flex items-center justify-between px-4 text-sm md:text-base'>
        <div>Copyright © {new Date().getFullYear()}</div>
        <div>hydego17</div>
      </div>
    </Footer>
  );
};

/**
 * Main application layout using mantine app-shell.
 *
 * @see {@link https://mantine.dev/core/app-shell}
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell className='[&_main]:bg-slate-50' navbar={<AppNavbar />} header={<AppHeader />} footer={<AppFooter />}>
      <div className='py-4 lg:px-2'>{children}</div>
    </AppShell>
  );
}
