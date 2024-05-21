import AddNewModal from '../../ui/AddNewModal';
import Error from '../../ui/Error';
import AddPrescriptionForm from './AddPrescriptionForm';

function Labs({ labs }) {
  return (
    <>
      {Object.keys(labs).length == 0 && (
        <div className="flex justify-center">
          <Error>No labs Requested yet</Error>
        </div>
      )}
      {Object.keys(labs).length > 0 && (
        <>
          <div>labs</div>
        </>
      )}
      <div className="mt-6 flex h-[4rem] self-end">
        <AddNewModal buttonLabel="Add New Labs">
          <AddPrescriptionForm />
        </AddNewModal>
      </div>
    </>
  );
}

export default Labs;
