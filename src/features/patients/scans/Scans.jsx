import { useNavigate, useSearchParams } from 'react-router-dom';

import { useScans } from './services/useGetScans';

import ScanItem from './ScanItem';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';

function Scans() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: scans, error, isLoading } = useScans();

  if (isLoading) return <Spinner />;
  if (!scans) return <Error>No Scans Yet, Request Scan to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  function handleClick() {
    navigate('add');
  }

  return (
    <>
      <DataShowingLayout heading={`Scans`}>
        {searchParams.has('q') ? (
          <ScanItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <Button type="button" sort="primary" onClick={handleClick}>
                Request New Scan
              </Button>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Scan name</div>
                </Table.Header>

                <Table.Body
                  data={scans}
                  render={(scan) => (
                    <ScanRow key={scan.created_date} scan={scan} />
                  )}
                />
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
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {scan.scan_name}
      </div>
    </Table.Row>
  );
}
