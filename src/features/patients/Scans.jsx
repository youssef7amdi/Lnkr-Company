import AddNewModal from '../../ui/AddNewModal';
import Error from '../../ui/Error';
import AddPrescriptionForm from './AddPrescriptionForm';

function Scans({ scans }) {
  return (
    <>
      {Object.keys(scans).length == 0 && (
        <div className="flex justify-center">
          <Error>No Scans Requested yet</Error>
        </div>
      )}
      {Object.keys(scans).length > 0 && (
        <>
          <div>scans</div>
        </>
      )}
      <div className="mt-6 flex h-[4rem] self-end">
        <AddNewModal buttonLabel="Add New Scans">
          <AddPrescriptionForm />
        </AddNewModal>
      </div>
    </>
  );
}

export default Scans;
