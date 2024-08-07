import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';

function AppLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  function openSideBar() {
    setIsSideBarOpen(true);
  }

  function closeSideBar() {
    setIsSideBarOpen(false);
  }
  return (
    <div
      className={`grid h-screen ${isSideBarOpen ? 'grid-cols-[26rem_1fr]' : ''} grid-rows-[auto_1fr]`}
    >
      <Header openSideBar={openSideBar} isSideBarOpen={isSideBarOpen} />
      {isSideBarOpen && <Sidebar closeSideBar={closeSideBar} />}
      <main className="overflow-auto bg-gray-50 p-[3rem_4.8rem_2.4rem]">
        <div className="mx-auto my-0 flex  flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
