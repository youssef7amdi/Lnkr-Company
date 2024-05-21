import AddNewModal from '../../ui/AddNewModal';
import Error from '../../ui/Error';
import AddPrescriptionForm from './AddPrescriptionForm';

function TreatmentPlans({ treatmentPlans }) {
  return (
    <>
      {Object.keys(treatmentPlans).length == 0 && (
        <div className="flex justify-center">
          <Error>No Treatment Plans To Show</Error>
        </div>
      )}
      {Object.keys(treatmentPlans).length > 0 && (
        <>
          <div>Treatment Plans</div>
        </>
      )}
      <div className="mt-6 flex h-[4rem] self-end">
        <AddNewModal buttonLabel="Add New Treatment Plan">
          <AddPrescriptionForm />
        </AddNewModal>
      </div>
    </>
  );
}

export default TreatmentPlans;
