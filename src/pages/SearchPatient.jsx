import { useState } from 'react';
import SearchInput from '../features/patients/SearchInput';
import SearchResult from '../features/patients/SearchResult';
import Error from '../ui/Error';

var patientResults = [
  {
    id: 1,
    name: 'Youssef Hamdi',
    mobile: '01111630525',
    insurer: 'lnkr',
    medicalNetwork: 'gama',
    service: 'examination for cardio',
  },
  {
    id: 2,
    name: 'Ahmed Hamdi',
    mobile: '01155972269',
    insurer: 'lnkr',
    medicalNetwork: 'gama',
    service: 'examination for cardio',
  },
];

function SearchPatient() {
  const [patientPhone, setPatientPhone] = useState('');
  const [result, setResult] = useState({});

  function handleSearch() {
    if (!Number(patientPhone)) return;
    if (patientPhone.trim().length != 0) {
      var res = patientResults.find(function getPatient(patient) {
        return Number(patient.mobile) == Number(patientPhone);
      });
      setResult(res);
    }
  }

  return (
    <div>
      <h1 className="text-center text-[3rem] font-[500] text-brand-900">
        Search for Patients
      </h1>
      <main className="flex flex-col items-center gap-[20px]">
        <SearchInput
          patientPhone={patientPhone}
          setPatientPhone={setPatientPhone}
          onClick={handleSearch}
        />
        {!result && <Error>No Patients Found</Error>}
        {result && Object.keys(result).length > 0 && (
          <SearchResult result={result} />
        )}
        {result && Object.keys(result).length == 0 && (
          <Error>Search Patient to Show</Error>
        )}
      </main>
    </div>
  );
}

export default SearchPatient;
