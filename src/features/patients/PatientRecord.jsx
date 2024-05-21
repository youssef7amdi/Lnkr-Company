import { useParams } from 'react-router-dom';
import Filter from '../../ui/Filter';
import PatientData from './PatientData';

const dataItemsFilter = [
  { label: 'Basic Info', value: 'basicInfo' },
  { label: 'Insurer Info', value: 'insurerInfo' },
  { label: 'Prescriptions', value: 'prescriptions' },
  { label: 'Labs', value: 'labs' },
  { label: 'Scans', value: 'scans' },
  { label: 'Vital Data', value: 'vitalData' },
  { label: 'Treatment Plans', value: 'treatmentPlans' },
  { label: 'Reports', value: 'reports' },
];

function PatientRecord() {
  // TODO make sure that you come to this route from patients and not from url
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[3rem] font-semibold">patient #{id}</h1>
        <Filter options={dataItemsFilter} filterField="dataToShow" />
      </div>
      <>
        <PatientData />
      </>
    </>
  );
}

export default PatientRecord;
