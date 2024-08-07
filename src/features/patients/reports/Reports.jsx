import { useSearchParams } from 'react-router-dom';

import { useReports } from './services/useGetReports';

import ReportItem from './ReportItem';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import AddNewModal from '../../../ui/AddNewModal';
import AddReportForm from './AddReportForm';
import Pagination from '../../../ui/Pagination';

function Reports() {
  const [searchParams] = useSearchParams();
  const {
    data: { data: reports, page, total },
    error,
    isLoading,
  } = useReports();

  if (isLoading) return <Spinner />;
  if (!reports) return <Error>No Reports Yet, Add Report to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataShowingLayout heading={`Reports`}>
        {searchParams.has('q') ? (
          <ReportItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <AddNewModal modalLabel={'report'} buttonLabel="Add Report">
                <AddReportForm />
              </AddNewModal>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Title</div>
                </Table.Header>

                <Table.Body
                  data={reports}
                  render={(report) => (
                    <ReportRow key={report.created_date} report={report} />
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

export default Reports;

function ReportRow({ report }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', report.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {report.created_date}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {report.title}
      </div>
    </Table.Row>
  );
}
