import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { getContracts } from '../../../services/settings/contractsApi';

export function useGetContracts() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();

  const pageNumber = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const { data, isLoading, error } = useQuery({
    queryKey: ['contracts', pageNumber, accessToken],
    queryFn: () => getContracts({ accessToken, page: pageNumber }),
    retry: 0,
    staleTime: 10 * 1000,
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

  return { data: data ? data : [], error, isLoading };
}
