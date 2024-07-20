import { useSearchParams } from 'react-router-dom';

import { formatPhoneNumber } from '../../utils/formatPhoneNumbers';

import { useGetVisitsItem } from './services/useGetVisitsItem';

import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import DataItem from '../../ui/DataItem';

function VisitsItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const {
    data: { patient },
    isLoading,
    error,
  } = useGetVisitsItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Name" value={patient.full_name} />
      <DataItem label="Mobile" value={formatPhoneNumber(patient.mobile)} />
      <DataItem label="Insurance" value={patient.insurance} />
      <DataItem label="Medical Network" value={patient.medical_network} />
    </>
  );
}

export default VisitsItem;
