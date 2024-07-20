import { useSearchParams } from 'react-router-dom';
import { useGetScanItem } from './services/useGetScanItem';
import { FaExternalLinkAlt } from 'react-icons/fa';

import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import DataItem from '../../../ui/DataItem';

function ScanItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetScanItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Scan Name" value={data.scan_name} />
      <DataItem label="Created At" value={data.created_date} />
      <div className="basis-full">
        <DataItem
          label="Scan Result"
          value={
            <a
              target="_blank"
              href={data.scan_result}
              className="inline-flex cursor-pointer text-brand-600 underline hover:text-brand-700"
            >
              Result <FaExternalLinkAlt className="ml-3 text-[1.3rem]" />
            </a>
          }
        />
      </div>
    </>
  );
}

export default ScanItem;
