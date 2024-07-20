import { useSearchParams } from 'react-router-dom';
import { useGetReportItem } from './services/useGetReportItem';

import Error from '../../../ui/Error';
import Spinner from '../../../ui/Spinner';
import DataItem from '../../../ui/DataItem';

function ReportItem() {
  const [searchParams] = useSearchParams();
  const query = searchParams.has('q') ? searchParams.get('q') : null;
  const { data, isLoading, error } = useGetReportItem(query);

  if (isLoading) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <DataItem label="Title" value={data.title} />
      <DataItem label="Created At" value={data.created_date} />
      <div className="basis-full">
        <DataItem label="Content" value={data.body} />
      </div>
    </>
  );
}

export default ReportItem;
