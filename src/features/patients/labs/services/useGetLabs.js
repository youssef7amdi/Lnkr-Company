import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getLabs } from '../../../../services/patient/labsApi';

export function useLabs() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: [`labs_${type ? type : 'result'}`, id],
    queryFn: () => getLabs({ accessToken, type: type ? type : 'result' }),
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
