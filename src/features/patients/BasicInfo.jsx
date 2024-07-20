import { useNavigate } from 'react-router-dom';

import { formatPhoneNumber } from '../../utils/formatPhoneNumbers';

import { useBasicInfoAccess } from '../../contexts/PatientInfoProvider';

import DataShowingLayout from '../../ui/DataShowingLayout';
import DataItem from '../../ui/DataItem';
import Error from '../../ui/Error';
import Button from '../../ui/Button';

function BasicInfo() {
  // TODO make sure that you come to this route from patients/id and not from url
  const { basicInfo } = useBasicInfoAccess();
  const navigate = useNavigate();
  if (!basicInfo || !basicInfo.patient)
    return (
      <Error>
        No Data to show, please Search patient Again{' '}
        <Button sort={'warn'} onClick={() => navigate('../')}>
          Go To Search
        </Button>
      </Error>
    );
  const { patient } = basicInfo;
  console.log(patient);

  return (
    <>
      <DataShowingLayout heading={`Basic Information`}>
        <DataItem label="Name" value={patient.full_name} />
        <DataItem label="Mobile" value={formatPhoneNumber(patient.mobile)} />
        <DataItem label="Insurance" value={patient.insurance} />
        <DataItem label="Medical Network" value={patient.medical_network} />
      </DataShowingLayout>
    </>
  );
}

export default BasicInfo;
