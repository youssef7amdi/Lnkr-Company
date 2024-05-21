import { useSearchParams } from 'react-router-dom';
import UserSettings from './physicianSettings/UserSettings';
import ProfileSettings from './physicianSettings/ProfileSettings';
import ProfessionalSettings from './physicianSettings/ProfessionalSettings';
import ShiftSettings from './physicianSettings/ShiftSettings';
import ServiceSettings from './physicianSettings/ServiceSettings';
import SyndicateSettings from './physicianSettings/SyndicateSettings';

function PhysicianSettings() {
  const [searchParams] = useSearchParams();

  const categoryItem = searchParams.get('item');

  return (
    <>
      {categoryItem && categoryItem == 'user' && <UserSettings />}
      {categoryItem && categoryItem == 'profile' && <ProfileSettings />}
      {categoryItem && categoryItem == 'professional' && (
        <ProfessionalSettings />
      )}
      {categoryItem && categoryItem == 'shift' && <ShiftSettings />}
      {categoryItem && categoryItem == 'service' && <ServiceSettings />}
      {categoryItem && categoryItem == 'syndicate' && <SyndicateSettings />}
    </>
  );
}

export default PhysicianSettings;
