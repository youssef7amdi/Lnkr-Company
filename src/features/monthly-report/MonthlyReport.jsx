import { useGetMonthlyReport } from './services/useGetMonthlyReport';

import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';

function MonthlyReport() {
  const { data: pdfURL, error, isLoading } = useGetMonthlyReport();

  if (isLoading) return <Spinner />;
  if (!pdfURL) return <Error>No Data to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return <iframe src={pdfURL} width="100%" height="650px" title="PDF Viewer" />;
}

export default MonthlyReport;
