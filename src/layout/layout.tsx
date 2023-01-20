import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { atom, useAtom } from 'jotai';
import { AppShell, Navbar, Header, Footer, MediaQuery, Burger, Badge, Indicator } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as TB from 'react-icons/tb';
import { cx } from '@/utils/cx';

const CartIndicator = dynamic(() => import('@/components/cart-indicator'), { ssr: false });

const navbarAtom = atom(false);

const navMenus = [
  { label: 'Products', href: '/products', icon: TB.TbLayoutGrid },
  { label: 'Carts', href: '/carts', icon: TB.TbShoppingCart },
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
          {navMenus.map((menu) => {
            const active = menu.href === activePage || activePage.includes(menu.href);
            const showCarts = menu.href === '/carts';

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => toggleNavbar(false)}
                className={cx(
                  'flex items-center gap-3 p-3 rounded',
                  active ? 'bg-violet-500 text-white' : 'hover:bg-slate-100'
                )}
              >
                <div>
                  <menu.icon size={20} />
                </div>

                <div className='font-medium truncate flex items-center'>
                  <span>{menu.label}</span>

                  {showCarts && <CartIndicator className='ml-2' />}
                </div>
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

        <Link href='/' onClick={() => toggleNavbar((o) => !o)}>
          <div className='font-bold text-xl'>Admin Shop</div>
        </Link>
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
    <AppShell className='[&_main]:bg-slate-50' navbar={<AppNavbar />} header={<AppHeader />}>
      <div className='py-4 lg:px-2'>{children}</div>
    </AppShell>
  );
}
