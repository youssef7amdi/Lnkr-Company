import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import SelectFilter from './SelectFilter';

function SortBy({ options, sortField }) {
  const valuesArr = options.reduce((acc, cur) => {
    acc?.push(cur.value);
    return acc;
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortByOption = options.find((option) => {
    if (searchParams.get(sortField))
      return option.value == searchParams.get(sortField);
    else return options.at(0);
  });

  useEffect(function () {
    if (!searchParams.get(sortField)) {
      searchParams.set(sortField, options.at(0).value);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!valuesArr.includes(currentSortByOption.value))
    return <Navigate replace to={'/404'} />;

  function handleChange(option) {
    searchParams.set(sortField, option.value);
    if (searchParams.get('item')) searchParams.delete('item');
    setSearchParams(searchParams);
  }

  return (
    <SelectFilter
      options={options}
      onChange={(option) => handleChange(option)}
      value={currentSortByOption}
    />
  );
}

export default SortBy;
