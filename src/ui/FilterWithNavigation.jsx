import { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import Button from './Button';

function FilterWithNavigation({ options }) {
  const valuesArr = options?.reduce((acc, cur) => {
    acc?.push(cur.value);
    return acc;
  }, []);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qID = searchParams.get('q');
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(
    function () {
      const lastPath = pathname.split('/').at(-1);
      if ((!lastPath || !valuesArr.includes(lastPath)) && lastPath !== 'add')
        setCurrentFilter('');
      else setCurrentFilter(lastPath);
    },
    [pathname, valuesArr],
  );

  if (valuesArr && Object.keys(valuesArr).length == 0) return;

  function handleClick(value) {
    setSearchParams({});
    navigate(`${id}/${value}`);
  }

  return (
    <div className="flex gap-[0.4rem] rounded-[7px] border border-gray-100 bg-gray-50 p-[0.4rem] shadow-sm">
      {options?.map((option) => (
        <Button
          role="link"
          sort="filterButton"
          key={option.value}
          active={option.value === currentFilter && !qID}
          disabled={option.value === currentFilter && !qID}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default FilterWithNavigation;
