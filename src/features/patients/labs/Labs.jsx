import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLabs } from './services/useGetLabs';

import LabItem from './LabItem';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import FilterWithQueries from '../../../ui/FilterWithQueries';

function Labs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: labs, error, isLoading } = useLabs();

  if (isLoading) return <Spinner />;
  if (!labs) return <Error>No Labs Yet, Request Lab to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  function handleClick() {
    navigate('add');
  }

  return (
    <>
      <DataShowingLayout
        heading={
          <div className="flex w-full items-center justify-between">
            <span>Labs</span>
            <FilterWithQueries filterField={'type'} options={options} />
          </div>
        }
      >
        {searchParams.has('q') ? (
          <LabItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <Button type="button" sort="primary" onClick={handleClick}>
                Request New Lab
              </Button>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  {labs.at(0).lab_name && <div>Laboratory Test Name</div>}
                </Table.Header>

                <Table.Body
                  data={labs}
                  render={(lab) => <LabRow key={lab.created_date} lab={lab} />}
                />
              </Table>
            </div>
          </>
        )}
      </DataShowingLayout>
    </>
  );
}

export default Labs;

function LabRow({ lab }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', lab.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {lab.created_date}
      </div>
      {lab.lab_name && (
        <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
          {lab.lab_name}
        </div>
      )}
    </Table.Row>
  );
}

var options = [
  { label: 'Results', value: 'result' },
  { label: 'Requests', value: 'request' },
];
