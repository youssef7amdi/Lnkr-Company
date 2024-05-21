import { Link, useSearchParams } from 'react-router-dom';
import DataShowingLayout from '../../ui/DataShowingLayout';
import Error from '../../ui/Error';
import Table, { TableContext } from '../../ui/Table';
import { useContext } from 'react';
import AddNewModal from '../../ui/AddNewModal';
import AddPrescriptionForm from './AddPrescriptionForm';
import DataDetailsLayout from '../../ui/DataDetailsLayout';

function Prescriptions({ prescriptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataId = searchParams.get('id');

  if (dataId) return <DataDetailsLayout />;

  function handleClick(e, id) {
    e.preventDefault();
    searchParams.set('id', id);
    setSearchParams(searchParams);
  }

  if (!dataId)
    return (
      <>
        {Object.keys(prescriptions).length == 0 && (
          <div className="flex justify-center">
            <Error>No Prescriptions yet</Error>
          </div>
        )}
        {Object.keys(prescriptions).length > 0 && (
          <>
            <DataShowingLayout heading="Prescriptions">
              <div className="grow">
                <Table columns="grid-cols-[1fr_1fr]">
                  <Table.Header>
                    <div>Date & Time</div>
                    <div>ID</div>
                  </Table.Header>

                  <Table.Body
                    data={prescriptions}
                    render={(prescription) => (
                      <PrescriptionRow
                        key={prescription.id}
                        id={prescription.id}
                        handleClick={handleClick}
                        dateAndTime={prescription.dateAndTime}
                      />
                    )}
                  />
                </Table>
              </div>
            </DataShowingLayout>
          </>
        )}
        <div className="mt-6 flex h-[4rem]  self-end">
          <AddNewModal buttonLabel="Add New Prescription">
            <AddPrescriptionForm />
          </AddNewModal>
        </div>
      </>
    );
}

export default Prescriptions;

function PrescriptionRow({ id, dateAndTime, handleClick }) {
  const { columns, rowGrid } = useContext(TableContext);

  return (
    <Table.Row>
      <Link
        onClick={(e) => handleClick(e, id)}
        className={`${rowGrid} ${columns} cursor-pointer px-[2.4rem] py-[1.2rem] hover:bg-gray-100`}
      >
        <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
          {dateAndTime}
        </div>
        <div className="font-[sono] text-[1.4rem] font-[500] text-gray-700">
          #{id}
        </div>
      </Link>
    </Table.Row>
  );
}
