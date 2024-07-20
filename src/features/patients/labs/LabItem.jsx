import { useSearchParams } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useGetLabItem } from './services/useGetLabItem';

import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import DataItem from '../../../ui/DataItem';

function LabItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetLabItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      {data.lab_name && <DataItem label="Test Name" value={data.lab_name} />}{' '}
      <DataItem label="Created At" value={data.created_date} />
      {data.requested_service && (
        <div className="basis-full">
          <DataItem
            label="Requests"
            value={
              <span className="flex flex-col gap-[0.5rem]">
                {data.requested_service.map((service) => (
                  <span key={service}>- {service}</span>
                ))}
              </span>
            }
          />
        </div>
      )}
      {data.lab_result && (
        <div className="basis-full">
          <DataItem
            label="Lab Result"
            value={
              <a
                target="_blank"
                href={data.lab_result}
                className="inline-flex cursor-pointer text-brand-600 underline hover:text-brand-700"
              >
                Result <FaExternalLinkAlt className="ml-3 text-[1.3rem]" />
              </a>
            }
          />
        </div>
      )}
      {data.general_comment && (
        <div className="basis-full">
          <DataItem label="General Comment" value={data.general_comment} />
        </div>
      )}
    </>
  );
}

export default LabItem;
