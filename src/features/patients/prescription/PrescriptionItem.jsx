import { useSearchParams } from 'react-router-dom';

import { useGetPrescriptionItem } from './services/useGetPrescriptionItem';

import DataItem from '../../../ui/DataItem';
import Table from '../../../ui/Table';
import Spinner from '../../../ui/Spinner';
import Error from '../../../ui/Error';

function PrescriptionItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetPrescriptionItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;
  const {
    created_date,
    diagnosis,
    prescribed_drug,
    general_comment,
    is_claim,
  } = data;

  return (
    <>
      <DataItem label="Date" value={created_date} />

      <DataItem
        label="Diagnosis"
        value={
          <span className="flex flex-col gap-[0.5rem]">
            {diagnosis.map((item) => (
              <span key={item}>- {item}</span>
            ))}
          </span>
        }
      />
      <div className="mb-[2rem] flex basis-full flex-col gap-[1.4rem]">
        <h3 className=" mt-5 text-[1.8rem] font-bold text-black">
          Prescribed Drugs:
        </h3>
        <Table columns="grid-cols-[0.4fr_1.6fr]">
          <Table.Header>
            <div className="text-center">Quantity</div>
            <div className="text-center">Drug</div>
          </Table.Header>

          <Table.Body
            data={prescribed_drug}
            render={(drug) => <DrugRow key={drug.general_name} drug={drug} />}
          />
        </Table>
      </div>

      <DataItem label={'Status'} value={<>{is_claim}</>} />
      {general_comment && (
        <div className="mt-[2.4rem] basis-full">
          <DataItem label={'General Comment'} value={<>{general_comment}</>} />
        </div>
      )}
    </>
  );
}

export default PrescriptionItem;

function DrugRow({ drug }) {
  const { general_name, active_ingredient, directions, quantity } = drug;

  return (
    <Table.Row>
      <div className="text-center font-[sono] text-[1.4rem] font-[500] text-gray-700">
        {quantity}
      </div>
      <div className="flex flex-col gap-[0.5rem] text-center font-[sono] text-[1.4rem] font-[500] text-gray-600">
        <span className="text-[1.6rem] font-[600]">{general_name}</span>
        <span className="text-[1rem] text-gray-600">{active_ingredient}</span>
        <span className="text-[1.1rem]">{directions}</span>
      </div>
    </Table.Row>
  );
}
