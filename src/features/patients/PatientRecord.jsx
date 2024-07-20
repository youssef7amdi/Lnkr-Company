import { Outlet } from 'react-router-dom';

import FilterWithNavigation from '../../ui/FilterWithNavigation';

function PatientRecord() {
  // TODO make sure that you come to this route from patients and not from url

  return (
    <>
      <div className="flex items-center justify-end">
        <FilterWithNavigation options={dataItemsFilter} />
      </div>

      <div className="mt-[2.5rem]">
        <Outlet />
      </div>
    </>
  );
}

export default PatientRecord;

var dataItemsFilter = [
  { label: 'Basic Info', value: '' },
  { label: 'Medical History', value: 'medicalHistory' },
  { label: 'Vital Data', value: 'vitalData' },
  { label: 'Prescriptions', value: 'prescriptions' },
  { label: 'Labs', value: 'labs' },
  { label: 'Scans', value: 'scans' },
  { label: 'Treatment Plans', value: 'treatmentPlans' },
  { label: 'Reports', value: 'reports' },
];
