import AddNewModal from '../../ui/AddNewModal';
import Error from '../../ui/Error';
import AddPrescriptionForm from './AddPrescriptionForm';

function VitalData({ vitalData }) {
  return (
    <>
      {Object.keys(vitalData).length == 0 && (
        <div className="flex justify-center">
          <Error>No Vital Data Available</Error>
        </div>
      )}
      {Object.keys(vitalData).length > 0 && (
        <>
          <div>vital data</div>
        </>
      )}
      <div className="mt-6 flex h-[4rem] self-end">
        <AddNewModal buttonLabel="Add New Vital Data Information">
          <AddPrescriptionForm />
        </AddNewModal>
      </div>
    </>
  );
}

export default VitalData;
