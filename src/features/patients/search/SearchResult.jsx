import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { useSearch } from './services/useSearch';
import { useChooseService } from './services/useChooseService';

import Button from '../../../ui/Button';
import DataShowingLayout from '../../../ui/DataShowingLayout';
import Spinner from '../../../ui/Spinner';
import DataItem from '../../../ui/DataItem';
import Error from '../../../ui/Error';

import ChooseService from './ChooseService';

function SearchResult({ searchData }) {
  const [service, setService] = useState();
  const { data, error, searchLoading } = useSearch(searchData);
  const { chooseServiceFn, chooseServiceStatus } = useChooseService();
  const chooseServiceLoading = chooseServiceStatus === 'pending';

  if (searchLoading) return <Spinner />;
  if (!data) return <Error>No Patients Found</Error>;
  if (error) return <Error>{error?.message}</Error>;

  const { full_name, insurance } = data;

  function handleAccessProfile() {
    if (!service) return;
    chooseServiceFn({ service: service.value });
  }

  return (
    <>
      <DataShowingLayout
        headingIcon={<FaUserCircle className="h-[3.2rem] w-[3.2rem]" />}
        heading={`Patient`}
      >
        <DataItem label="Name" value={full_name} />
        <DataItem label="Insurer" value={insurance} />
        <ChooseService
          onChange={setService}
          chooseServiceLoading={chooseServiceLoading}
        />
      </DataShowingLayout>

      <div className="flex h-[4rem] self-end">
        <Button
          type="button"
          sort="primary"
          onClick={handleAccessProfile}
          disabled={!service || chooseServiceLoading}
        >
          Access Profile
        </Button>
      </div>
    </>
  );
}

export default SearchResult;
