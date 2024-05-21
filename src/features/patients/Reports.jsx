import AddNewModal from '../../ui/AddNewModal';
import Error from '../../ui/Error';
import AddPrescriptionForm from './AddPrescriptionForm';

function Reports({ reports }) {
  return (
    <>
      {Object.keys(reports).length == 0 && (
        <div className="flex justify-center">
          <Error>No Reports to Show</Error>
        </div>
      )}
      {Object.keys(reports).length > 0 && (
        <>
          <div>reports</div>
        </>
      )}
      <div className="mt-6 flex h-[4rem] self-end">
        <AddNewModal buttonLabel="Add New Reports">
          <AddPrescriptionForm />
        </AddNewModal>
      </div>
    </>
  );
}

export default Reports;
