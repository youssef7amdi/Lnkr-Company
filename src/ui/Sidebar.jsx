import { IoClose } from 'react-icons/io5';

import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar({ closeSideBar }) {
  return (
    <aside className="relative row-span-full flex flex-col gap-[3.2] overflow-y-auto border-r border-gray-100 bg-white px-[3.2rem] py-[2.4rem]">
      <Logo />
      <MainNav />
      <button
        className={
          'absolute right-[15px] top-[15px] inline-flex h-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-md text-[23px] text-brand-600 hover:bg-gray-100'
        }
        aria-label="close Side Bar"
        onClick={closeSideBar}
      >
        <IoClose />
      </button>
    </aside>
  );
}

export default Sidebar;
