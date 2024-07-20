import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getScans } from '../../../../services/patient/scansApi';

export function useGetScanItem(query) {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['scan_item', id, query],
    queryFn: () => getScans({ query, accessToken }),
    retry: 0,
    staleTime: 1000 * 1000,
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

  return { data: data ? data.data : [], error, isLoading };
}
