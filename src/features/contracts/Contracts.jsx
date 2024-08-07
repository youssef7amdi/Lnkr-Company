import { useSearchParams } from 'react-router-dom';

import { useGetContracts } from './services/useGetContracts';

import ContractsItem from './ContractsItem';

import DataShowingLayout from '../../ui/DataShowingLayout';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';

function Contracts() {
  const [searchParams] = useSearchParams();
  const {
    data: { data: contracts, page, total },
    error,
    isLoading,
  } = useGetContracts();

  if (isLoading) return <Spinner />;
  if (!contracts) return <Error>No Contracts Yet.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataShowingLayout heading={`Contracts`}>
        {searchParams.has('q') ? (
          <ContractsItem />
        ) : (
          <>
            <div className="grow">
              <Table columns="grid-cols-[_1fr_1fr_1fr]">
                <Table.Header>
                  <div>Service</div>
                  <div>Insurance</div>
                  <div>Medical Network</div>
                </Table.Header>

                <Table.Body
                  data={contracts}
                  render={(contract) => (
                    <ContractRow key={contract.uuid} contract={contract} />
                  )}
                />

                <Table.Footer>
                  <Pagination page={page} total={total} />
                </Table.Footer>
              </Table>
            </div>
          </>
        )}
      </DataShowingLayout>
    </>
  );
}

export default Contracts;

function ContractRow({ contract }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    searchParams.set('q', contract.uuid);
    setSearchParams(searchParams);
  }

  return (
    <Table.Row onClick={handleClick}>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {contract.service}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {contract.insurance}
      </div>
      <div className="font-[sono] text-[1.4rem] font-[500] capitalize text-gray-700">
        {contract.medical_network}
      </div>
    </Table.Row>
  );
}
