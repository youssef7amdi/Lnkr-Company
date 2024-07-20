import { useSearchParams } from 'react-router-dom';

import { useGetContractsItem } from './services/useGetContractsItem';

import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import DataItem from '../../ui/DataItem';

function ContractsItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetContractsItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Service" value={data.service} />
      <DataItem label="Insurance" value={data.insurance} />
      <DataItem label="Medical Network" value={data.medical_network} />
      <DataItem
        label="Price"
        value={
          <div className="flex flex-col gap-[0.5rem]">
            <span>
              - Base Price:{' '}
              <span className="text-brand-700">
                {Number(data.base_price).toFixed(1)} LE
              </span>
            </span>
            <span>
              - Patient Pay:{' '}
              <span className="text-brand-700">
                {Number(data.patient_pay).toFixed(1)} LE
              </span>
            </span>
            <span>
              - Insurance Pay:{' '}
              <span className="text-brand-700">
                {Number(data.insurance_pay_dentist).toFixed(1)} LE
              </span>
            </span>
            <span>
              - Lnkr Fee dentist:{' '}
              <span className="text-brand-700">
                {Number(data.lnkr_fee_dentist).toFixed(1)} LE
              </span>
            </span>
          </div>
        }
      />
    </>
  );
}

export default ContractsItem;
