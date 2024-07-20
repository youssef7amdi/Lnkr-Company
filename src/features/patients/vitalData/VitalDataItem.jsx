import { useSearchParams } from 'react-router-dom';
import { useGetVitalDataItem } from './services/useGetVitalDataItem';

import Spinner from '../../../ui/Spinner';
import Error from '../../../ui/Error';
import DataItem from '../../../ui/DataItem';

function VitalDataItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetVitalDataItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Created At" value={data.created_date} />
      <DataItem
        label="Temperature"
        value={data.temperature ? data.temperature : '-'}
      />
      <DataItem label="Weight" value={data.weight} />
      <DataItem label="Height" value={data.height} />
      <DataItem
        label="Blood Pressure"
        value={data.blood_pressure ? data.blood_pressure : '-'}
      />
      <DataItem
        label="Sugar Level"
        value={data.sugar_level ? data.sugar_level : '-'}
      />
      <DataItem
        label="Oxygen Saturation"
        value={data.oxygen_saturation ? data.oxygen_saturation : '-'}
      />
      <DataItem label="Race" value={data.race ? data.race : '-'} />
      <DataItem label="Pulse" value={data.pulse ? data.pulse : '-'} />
      <DataItem label="BMI" value={data.bmi ? data.bmi : '-'} />
      <DataItem label="Other" value={data.other ? data.other : '-'} />
    </>
  );
}

export default VitalDataItem;
