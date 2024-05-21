import { useSearchParams } from 'react-router-dom';
import ClinicInfo from './clinicSettings/ClinicInfo';
import AddressSettings from './clinicSettings/AddressSettings';

function ClinicSettings() {
  const [searchParams] = useSearchParams();

  const categoryItem = searchParams.get('item');

  return (
    <>
      {categoryItem && categoryItem == 'basicInfo' && <ClinicInfo />}
      {categoryItem && categoryItem == 'address' && <AddressSettings />}
    </>
  );
}

export default ClinicSettings;
