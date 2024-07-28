import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { getMonthlyReport } from '../../../services/more/monthlyReportApi';

export function useGetMonthlyReport() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { data, isLoading, error } = useQuery({
    queryKey: ['monthly-report', accessToken],
    queryFn: () => getMonthlyReport({ accessToken }),
    retry: 0,
    staleTime: 1000 * 1000000,
  });

  useEffect(
    function () {
      if (
        error?.message === 'No Permission Here' ||
        error?.message === 'Log in expired, Please Log in again'
      ) {
        removeCookie('access_token');
        console.log('Error', error.message);
      }
    },
    [error, removeCookie],
  );

  return { data, error, isLoading };
}
