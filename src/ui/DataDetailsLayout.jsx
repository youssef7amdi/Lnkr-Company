import { useSearchParams } from 'react-router-dom';
import Prescription from '../features/patients/Prescription';

function DataDetailsLayout() {
  // TODO make sure that you come to this route from patients/id/dataToShow and not from url

  const [searchParams] = useSearchParams();
  const dataToShow = searchParams.get('dataToShow');

  return <>{dataToShow == 'prescriptions' && <Prescription />}</>;
}

export default DataDetailsLayout;
