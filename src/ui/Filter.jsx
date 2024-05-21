import { Navigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import { useEffect } from 'react';

function Filter({ filterField, options }) {
  const valuesArr = options?.reduce((acc, cur) => {
    acc?.push(cur.value);
    return acc;
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options?.at(0)?.value;
  const dataId = searchParams.get('id');

  useEffect(
    function () {
      if (!searchParams.get(filterField)) {
        searchParams.set(filterField, options?.at(0)?.value);
        setSearchParams(searchParams);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );

  if (valuesArr && Object.keys(valuesArr).length == 0) return;

  if (
    valuesArr &&
    Object.keys(valuesArr).length > 0 &&
    !valuesArr.includes(currentFilter)
  )
    return <Navigate replace to={'/404'} />;

  function handleClick(value) {
    if (value === null) searchParams.delete(filterField);
    else searchParams.set(filterField, value);

    if (searchParams.get('id')) searchParams.delete('id');

    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-[0.4rem] rounded-[7px] border border-gray-100 bg-white p-[0.4rem] shadow-sm">
      {options?.map((option) => (
        <Button
          role="link"
          sort="filterButton"
          key={option.value}
          active={option.value === currentFilter && !dataId}
          // active={option.value === currentFilter}
          disabled={option.value === currentFilter && !dataId}
          // disabled={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
