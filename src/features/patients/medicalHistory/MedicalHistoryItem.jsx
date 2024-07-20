import { useSearchParams } from 'react-router-dom';

import { useGetMedicalHistoryItem } from './services/useGetMedicalHistoryItem';

import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import DataItem from '../../../ui/DataItem';

function MedicalHistoryItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetMedicalHistoryItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Chronic" value={data.chronic} />
      <DataItem label="Marital Status" value={data.marital_status} />
      <DataItem label="Blood Group" value={data.blood_type} />
      <DataItem
        label="Food Allergy"
        value={data.food_allergy ? data.food_allergy : 'None'}
      />
      <DataItem
        label="Drug Allergy"
        value={data.drug_allergy ? data.drug_allergy : 'None'}
      />
      <DataItem label="Smoking" value={data.smoking ? data.smoking : 'No'} />
      <DataItem label="Alcoholic" value={data.alcohol ? data.alcohol : 'No'} />
    </>
  );
}

export default MedicalHistoryItem;
