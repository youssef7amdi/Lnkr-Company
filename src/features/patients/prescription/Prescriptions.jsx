import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetPrescriptions } from './services/useGetPrescriptions';

import PrescriptionItem from './PrescriptionItem';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import Error from '../../../ui/Error';
import Table from '../../../ui/Table';
import Spinner from '../../../ui/Spinner';
import Tag from '../../../ui/Tag';
import Button from '../../../ui/Button';

function Prescriptions() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: prescriptions, error, isLoading } = useGetPrescriptions();

  if (isLoading) return <Spinner />;
  if (!prescriptions)
    return <Error>No Medical Histories Yet, Add History to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  function handleClick() {
    navigate('add');
  }

  return (
    <>
      <DataShowingLayout heading={`Prescriptions`}>
        {searchParams.has('q') ? (
          <PrescriptionItem />
        ) : (
          <>
            <div className="mb-6 flex h-[4rem] w-full">
              <Button type="button" sort="primary" onClick={handleClick}>
                Add Prescription
              </Button>
            </div>
            <div className="grow">
              <Table columns="grid-cols-[1fr_1fr_1fr]">
                <Table.Header>
                  <div>Created At</div>
                  <div>Drugs</div>
                  <div>Status</div>
                </Table.Header>

                <Table.Body
                  data={prescriptions}
                  render={(prescription) => (
                    <PrescriptionRow
                      key={prescription.created_date}
                      prescription={prescription}
                    />
                  )}
                />
              </Table>
            </div>
          </>
        )}
      </DataShowingLayout>
    </>
  );
}

export default Prescriptions;

function PrescriptionRow({ prescription }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', prescription.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] text-gray-600">
        {prescription.created_date}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {prescription.prescribed_drug.map((drug) => (
          <span className="mb-2 block" key={drug}>
            - {drug}
          </span>
        ))}
      </div>
      <div>
        <Tag color="text-orange-700" bgColor="bg-orange-200">
          {prescription.is_claim}
        </Tag>
      </div>
    </Table.Row>
  );
}
