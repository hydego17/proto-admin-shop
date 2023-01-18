import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('./layout'));
export default Layout;
