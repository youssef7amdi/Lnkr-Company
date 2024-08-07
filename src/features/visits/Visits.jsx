import { useSearchParams } from 'react-router-dom';

import { useGetVisits } from './services/useGetVisits';

import VisitsItem from './VisitsItem';

import DataShowingLayout from '../../ui/DataShowingLayout';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';

function Visits() {
  const [searchParams] = useSearchParams();
  const {
    data: { data: visits, page },
    error,
    isLoading,
  } = useGetVisits();

  if (isLoading) return <Spinner />;
  if (!visits) return <Error>No Visits Yet.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataShowingLayout heading={`Visits`}>
        {searchParams.has('q') ? (
          <VisitsItem />
        ) : (
          <>
            <div className="grow">
              <Table columns="grid-cols-[0.5fr_1fr_0.5fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Patient</div>
                  <div>Insurance</div>
                  <div>Service</div>
                </Table.Header>

                <Table.Body
                  data={visits}
                  render={(visit) => (
                    <VisitRow key={visit.created_date} visit={visit} />
                  )}
                />

                <Table.Footer>
                  <Pagination page={page} total={visits.length} />
                </Table.Footer>
              </Table>
            </div>
          </>
        )}
      </DataShowingLayout>
    </>
  );
}

export default Visits;

function VisitRow({ visit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', visit.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {visit.created_date}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {visit.patient}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {visit.insurance}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {visit.service}
      </div>
    </Table.Row>
  );
}
