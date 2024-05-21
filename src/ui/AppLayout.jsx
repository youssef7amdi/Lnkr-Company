import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-gray-50 p-[4rem_4.8rem_6.4rem]">
        <div className="gap mx-auto my-0 flex max-w-[120rem] flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
