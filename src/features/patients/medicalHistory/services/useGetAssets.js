import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getMedicalAssets } from '../../../../services/patient/medicalHistoryApi';

export function useGetAssets() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const {
    data,
    isLoading: assetsLoading,
    error,
  } = useQuery({
    queryKey: ['medical_assets'],
    queryFn: () => getMedicalAssets(accessToken),
    retry: 0,
    staleTime: 1000 * 10000,
  });

  // const {blood_type, marital_status} = data?.data;
  // const blood

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

  return { data: data ? data.data : [], error, assetsLoading };
}
