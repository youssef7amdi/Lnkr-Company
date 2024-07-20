import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiDocumentDuplicate,
} from 'react-icons/hi2';
import { HiSearchCircle, HiDocumentReport } from 'react-icons/hi';
import { FaPersonWalking } from 'react-icons/fa6';
import { TbCalendarDue } from 'react-icons/tb';
import { MdPayments } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CgMoreVerticalO } from 'react-icons/cg';

const otherPath = otherLinks.map((link) => link.to);

function MainNav() {
  const { pathname } = useLocation();
  const lastPath = pathname.split('/').at(-1);
  const [showMoreLinks, setShowMoreLinks] = useState(
    otherPath.includes(lastPath),
  );

  return (
    <ul className="mt-[3rem] flex flex-col gap-3 capitalize">
      {mainLinks.map((link) => (
        <li key={link.to}>
          <NavLink to={`/${link.to}`} className="nav-link main-nav-link">
            {link.icon}
            <span>
              {link.to === 'dashboard'
                ? 'home'
                : link.to === 'patient'
                  ? 'Search'
                  : link.to}
            </span>
          </NavLink>
        </li>
      ))}
      <li>
        <a
          href="/"
          className="nav-link main-nav-link"
          onClick={(e) => {
            e.preventDefault();
            setShowMoreLinks((prev) => !prev);
          }}
          role="button"
        >
          <CgMoreVerticalO />
          <span className="flex grow justify-between">
            <span>More</span>
            <span className="self-center text-[0.3rem]">
              {showMoreLinks ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </span>
        </a>
        {showMoreLinks && (
          <ul className="ml-5 mt-3 flex flex-col gap-3 capitalize">
            {otherLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={`/${link.to}`} className="nav-link other-nav-link">
                  {link.icon}
                  <span>
                    {link.to === 'dashboard'
                      ? 'home'
                      : link.to === 'search-patient'
                        ? 'Search'
                        : link.to}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
}

export default MainNav;

var mainLinks = [
  { to: 'dashboard', icon: <HiOutlineHome /> },
  { to: 'patient', icon: <HiSearchCircle /> },
  { to: 'contracts', icon: <HiDocumentDuplicate /> },
  { to: 'settings', icon: <HiOutlineCog6Tooth /> },
];

var otherLinks = [
  { to: 'visits', icon: <FaPersonWalking /> },
  { to: 'monthly-reports', icon: <HiDocumentReport /> },
  { to: 'Dues', icon: <TbCalendarDue /> },
  { to: 'payments', icon: <MdPayments /> },
];
