import { Navigate, useSearchParams } from 'react-router-dom';
import Select from './Select';
import { useEffect } from 'react';

function SortBy({ options, sortField }) {
  const valuesArr = options.reduce((acc, cur) => {
    acc?.push(cur.value);
    return acc;
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get(sortField) || options.at(0).value;

  useEffect(function () {
    if (!searchParams.get(sortField)) {
      searchParams.set(sortField, options.at(0).value);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!valuesArr.includes(currentSortBy))
    return <Navigate replace to={'/404'} />;

  function handleChange(e) {
    searchParams.set(sortField, e.target.value);
    if (searchParams.get('item')) searchParams.delete('item');
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={(e) => handleChange(e)}
      value={currentSortBy}
    />
  );
}

export default SortBy;
