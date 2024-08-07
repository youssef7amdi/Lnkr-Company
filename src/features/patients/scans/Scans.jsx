import { useNavigate, useSearchParams } from 'react-router-dom';

import { useScans } from './services/useGetScans';

import ScanItem from './ScanItem';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import FilterWithQueries from '../../../ui/FilterWithQueries';
import Pagination from '../../../ui/Pagination';

function Scans() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    data: { data: scans, page, total },
    error,
    isLoading,
  } = useScans();

  if (isLoading) return <Spinner />;
  if (!scans) return <Error>No Scans Yet, Request Scan to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  function handleClick() {
    navigate('add');
  }

  return (
    <>
      <DataShowingLayout
        heading={
          <div className="flex w-full items-center justify-between">
            <span>Scans</span>
            <FilterWithQueries filterField={'type'} options={options} />
          </div>
        }
      >
        {searchParams.has('q') ? (
          <ScanItem />
        ) : (
          <>
            {searchParams.get('type') === 'request' && (
              <div className="mb-6 flex h-[4rem] w-full">
                <Button type="button" sort="primary" onClick={handleClick}>
                  Request New Scan
                </Button>
              </div>
            )}
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  {scans.at(0).scan_name && <div>Scan name</div>}
                </Table.Header>

                <Table.Body
                  data={scans}
                  render={(scan) => (
                    <ScanRow key={scan.created_date} scan={scan} />
                  )}
                />

                <Table.Footer>
                  <Pagination page={page} total={total} />
                </Table.Footer>
              </Table>
            </div>
          </>
        )}
      </DataShowingLayout>
    </>
  );
}

export default Scans;

function ScanRow({ scan }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', scan.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {scan.created_date}
      </div>
      {scan.scan_name && (
        <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
          {scan.scan_name}
        </div>
      )}
    </Table.Row>
  );
}

var options = [
  { label: 'Results', value: 'imaging' },
  { label: 'Requests', value: 'request' },
];
