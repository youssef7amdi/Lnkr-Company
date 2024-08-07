import { useSearchParams } from 'react-router-dom';

import { useGetVitalData } from './services/useGetVitalData';

import VitalDataItem from './VitalDataItem';
import AddVitalDataForm from './AddVitalDataForm';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import AddNewModal from '../../../ui/AddNewModal';
import Pagination from '../../../ui/Pagination';

function VitalData() {
  const [searchParams] = useSearchParams();
  const {
    data: { data: vitals, page, total },
    error,
    isLoading,
  } = useGetVitalData();

  if (isLoading) return <Spinner />;
  if (!vitals) return <Error>No Vital Signs, Add vitals to show.</Error>;

  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataShowingLayout heading={`Vital Data`}>
        {searchParams.has('q') ? (
          <VitalDataItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <AddNewModal
                modalLabel={'vitalData'}
                buttonLabel="Add Vital Signs"
              >
                <AddVitalDataForm />
              </AddNewModal>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[2fr_1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Weight</div>
                  <div>Height</div>
                </Table.Header>

                <Table.Body
                  data={vitals}
                  render={(vitalData) => (
                    <VitalDataRow
                      key={vitalData.created_date}
                      vitalData={vitalData}
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

export default VitalData;

function VitalDataRow({ vitalData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', vitalData.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {vitalData.created_date}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-700">
        {vitalData.weight}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-700">
        {vitalData.height}
      </div>
    </Table.Row>
  );
}
