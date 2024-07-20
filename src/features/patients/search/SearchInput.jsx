import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

import Button from '../../../ui/Button';
import SelectPhoneCode from '../../../ui/SelectPhoneCode';
import ForwardedPatternFormat from '../../../ui/ForwardedPatternFormat';

function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [searchOption, setSearchOption] = useState(
    groupedSearchOptions[0].options.at(0),
  );
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e) {
    e.preventDefault();
    const value = inputValue.replace(/\s+/g, '');
    if (!Number(value)) {
      searchParams.delete('mobile');
      searchParams.delete('card');
    } else if (value.trim().length != 0) {
      if (searchOption.value === 'card') {
        if (searchParams.has('mobile')) searchParams.delete('mobile');
        searchParams.set('card', value);
      } else {
        if (searchParams.has('card')) searchParams.delete('card');
        searchParams.set('mobile', `${searchOption.value}${value}`);
      }
    }
    setSearchParams(searchParams);
  }

  return (
    <form
      className="mt-[3rem] flex w-[550px] flex-col items-center gap-[0.6rem]"
      onSubmit={(e) => handleSearch(e)}
    >
      <div className="mb-4 text-[2rem] font-semibold">
        by Phone Number or Card
      </div>
      <div className="flex w-[550px] justify-center gap-[0.6rem]">
        <SelectPhoneCode
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          options={groupedSearchOptions}
        />

        <ForwardedPatternFormat
          className="grow rounded-[7px] border border-gray-400 px-[1.2rem] py-[0.8rem] text-[1.6rem] focus:outline-brand-500"
          id="clinicPhone"
          placeholder={
            searchOption.value == 'card'
              ? 'Patient Card No..'
              : 'Patient Phone No..'
          }
          format={
            searchOption.value == 'card'
              ? '#### #### #### ####'
              : '### #### ###'
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" sort="primary">
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchInput;

var groupedSearchOptions = [
  {
    label: 'Phone Number',
    options: [
      {
        label: (
          <div>
            <ReactCountryFlag
              countryCode="EG"
              svg
              style={{
                fontSize: '2rem',
                lineHeight: '2rem',
              }}
              aria-label="Egypt"
              title="Egypt"
            />
            <span className="ml-[1rem] text-[1.3rem]">+20</span>
          </div>
        ),
        value: '0020',
      },
      {
        label: (
          <div>
            <ReactCountryFlag
              countryCode="sa"
              svg
              style={{
                fontSize: '2rem',
                lineHeight: '2rem',
              }}
              aria-label="Saudi Arabia"
              title="Saudi Arabia"
            />
            <span className="ml-[1rem] text-[1.3rem]">+966</span>
          </div>
        ),
        value: '00966',
      },
      {
        label: (
          <div>
            <ReactCountryFlag
              countryCode="ae"
              svg
              style={{
                fontSize: '2rem',
                lineHeight: '2rem',
              }}
              aria-label="Emirate"
              title="Emirate"
            />
            <span className="ml-[1rem] text-[1.3rem]">+971</span>
          </div>
        ),
        value: '00971',
      },
      {
        label: (
          <div>
            <ReactCountryFlag
              countryCode="Om"
              svg
              style={{
                fontSize: '2rem',
                lineHeight: '2rem',
              }}
              aria-label="Oman"
              title="Oman"
            />
            <span className="ml-[1rem] text-[1.3rem]">+968</span>
          </div>
        ),
        value: '00968',
      },
      {
        label: (
          <div>
            <ReactCountryFlag
              countryCode="LY"
              svg
              style={{
                fontSize: '2rem',
                lineHeight: '2rem',
              }}
              aria-label="Libya"
              title="Libya"
            />
            <span className="ml-[1rem] text-[1.3rem]">+218</span>
          </div>
        ),
        value: '00218',
      },
    ],
  },
  {
    label: 'Card',
    options: [
      {
        label: 'Card',
        value: 'card',
      },
    ],
  },
];
