import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../../contexts/CookiesAccessProvider';

import { getChoicesAssets } from '../../../../../services/patient/prescriptionApi';

export function useGetChoicesOptions() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const {
    data,
    isLoading: choicesAssetsLoading,
    error,
  } = useQuery({
    queryKey: [`choices_assets`],
    queryFn: () => getChoicesAssets(accessToken),
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

  return { data: data ? data.data : [], error, choicesAssetsLoading };
}
