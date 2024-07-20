import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { getContracts } from '../../../services/settings/contractsApi';

export function useGetContractsItem(query) {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { data, isLoading, error } = useQuery({
    queryKey: ['contracts_item', query],
    queryFn: () => getContracts({ accessToken, query }),
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
