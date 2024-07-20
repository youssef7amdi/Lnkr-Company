import { GrMoney } from 'react-icons/gr';

import { useGetDues } from './services/useGetDues';

import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';

function Dues() {
  const { data: dues, error, isLoading } = useGetDues();

  if (isLoading) return <Spinner />;
  if (!dues) return <Error>No Data to show.</Error>;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <div className="mt-[2.4rem] flex items-center rounded-[5px] bg-green-100 px-[3.2rem] py-[1.6rem] text-green-700">
        <div className="flex items-center gap-[0.8rem] py-[0.8rem] font-[600]">
          <GrMoney />

          <span className="ml-[0.8rem]">
            Dues:
            <span className="ml-3 font-[800] capitalize tracking-wide">
              {Number(dues).toFixed(1)} LE
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Dues;
