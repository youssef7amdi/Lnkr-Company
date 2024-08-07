import { useSearchParams } from 'react-router-dom';

import { useGetMedicalHistory } from './services/useGetMedicalHistory';

import MedicalHistoryItem from './MedicalHistoryItem';
import AddHistoryForm from './AddHistoryForm';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import AddNewModal from '../../../ui/AddNewModal';
import Pagination from '../../../ui/Pagination';

function MedicalHistory() {
  const [searchParams] = useSearchParams();
  const {
    data: { data: medicalHistories, page, total },
    error,
    isLoading,
  } = useGetMedicalHistory();

  if (isLoading) return <Spinner />;
  if (!medicalHistories)
    return <Error>No Medical Histories Yet, Add History to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataShowingLayout heading={`Medical History`}>
        {searchParams.has('q') ? (
          <MedicalHistoryItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <AddNewModal
                modalLabel={'medicalHistory'}
                buttonLabel="Add Medical History"
              >
                <AddHistoryForm />
              </AddNewModal>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Chronic</div>
                </Table.Header>

                <Table.Body
                  data={medicalHistories}
                  render={(medicalHistory) => (
                    <MedicalHistoryRow
                      key={medicalHistory.created_date}
                      medicalHistory={medicalHistory}
                    />
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

export default MedicalHistory;

function MedicalHistoryRow({ medicalHistory }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', medicalHistory.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {medicalHistory.created_date}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {medicalHistory.chronic}
      </div>
    </Table.Row>
  );
}
