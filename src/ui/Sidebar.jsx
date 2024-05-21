import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col gap-[3.2] overflow-y-auto border-r border-gray-100 bg-white px-[3.2rem] py-[2.4rem]">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
