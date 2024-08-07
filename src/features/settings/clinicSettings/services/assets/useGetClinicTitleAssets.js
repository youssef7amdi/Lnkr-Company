import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../../contexts/CookiesAccessProvider';

import { getClinicTitleAssets } from '../../../../../services/settings/clinicApi';

export function useGetClinicTitleAssets() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const {
    data,
    isLoading: clinicTitleAssetsLoading,
    error,
  } = useQuery({
    queryKey: [`clinic_title_assets`, accessToken],
    queryFn: () => getClinicTitleAssets(accessToken),
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

  return { data: data ? data.data : [], error, clinicTitleAssetsLoading };
}
