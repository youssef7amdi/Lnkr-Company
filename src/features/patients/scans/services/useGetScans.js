import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getScans } from '../../../../services/patient/scansApi';

export function useScans() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: [`scans_${type ? type : 'imaging'}`, id],
    queryFn: () => getScans({ accessToken, type: type ? type : 'imaging' }),
    retry: 0,
    staleTime: 1000 * 10,
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
