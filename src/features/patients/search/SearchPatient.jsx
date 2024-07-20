import { useSearchParams } from 'react-router-dom';

import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

function SearchPatient() {
  const [searchParams] = useSearchParams();
  const searchData = (function () {
    if (searchParams.has('mobile')) {
      return { label: 'mobile', value: searchParams.get('mobile') };
    } else if (searchParams.has('card')) {
      return { label: 'card_number', value: searchParams.get('card') };
    } else return '';
  })();

  return (
    <>
      <h1 className="text-center text-[3rem] font-[500] text-brand-900">
        Search for Patients
      </h1>
      <main className="flex flex-col items-center gap-[20px]">
        <SearchInput />
        {searchData && <SearchResult searchData={searchData} />}
      </main>
    </>
  );
}

export default SearchPatient;
