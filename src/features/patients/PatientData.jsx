import { useParams, useSearchParams } from 'react-router-dom';
import BasicInfo from './BasicInfo';
import InsurerInfo from './InsurerInfo';
import Prescriptions from './Prescriptions';
import { patientRecords } from '../../data/data';
import Labs from './Labs';
import Scans from './Scans';
import VitalData from './VitalData';
import TreatmentPlans from './TreatmentPlans';
import Reports from './Reports';

function PatientData() {
  // TODO make sure that you come to this route from patients/id and not from url

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dataToShow = searchParams.get('dataToShow');
  const patientResult = patientRecords.find((record) => record.id == id);

  return (
    <>
      {dataToShow == 'basicInfo' && (
        <BasicInfo basicInfo={patientResult.basicInfo} />
      )}
      {dataToShow == 'insurerInfo' && (
        <InsurerInfo insurerInfo={patientResult.insurerInfo} />
      )}
      {dataToShow == 'prescriptions' && (
        <Prescriptions prescriptions={patientResult.prescriptions} />
      )}
      {dataToShow == 'labs' && <Labs labs={patientResult.labs} />}
      {dataToShow == 'scans' && <Scans scans={patientResult.scans} />}
      {dataToShow == 'vitalData' && (
        <VitalData vitalData={patientResult.vitalData} />
      )}
      {dataToShow == 'treatmentPlans' && (
        <TreatmentPlans treatmentPlans={patientResult.treatmentPlans} />
      )}
      {dataToShow == 'reports' && <Reports reports={patientResult.reports} />}
    </>
  );
}

export default PatientData;
