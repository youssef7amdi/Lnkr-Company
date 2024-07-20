import { IoMoonOutline, IoExitOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';

import { useCookiesAccess } from '../contexts/CookiesAccessProvider';

const spanIconStyle =
  ' min-w-[35px] h-[35px] rounded-md text-brand-600 text-[23px] hover:bg-gray-100 inline-flex items-center justify-center cursor-pointer';

function Header() {
  const { removeCookie } = useCookiesAccess();

  return (
    <div className="flex items-center justify-end gap-4 border border-gray-100 bg-white px-[4.8rem] py-5">
      <button className={spanIconStyle} aria-label="Profile">
        <CiUser />
      </button>
      <button className={spanIconStyle} aria-label="Switch dark / light mode">
        <IoMoonOutline />
      </button>
      <button
        className={`${spanIconStyle} px-[0.8rem]`}
        onClick={() => {
          removeCookie('access_token');
        }}
        aria-label="Log out"
      >
        <IoExitOutline className="mr-3" />{' '}
        <span className="text-[15px]">Log out</span>
      </button>
    </div>
  );
}

export default Header;
