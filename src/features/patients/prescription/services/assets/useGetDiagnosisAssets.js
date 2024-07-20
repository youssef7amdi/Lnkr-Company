import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../../contexts/CookiesAccessProvider';

import { getDiagnosisAssets } from '../../../../../services/patient/prescriptionApi';

export function useGetDiagnosisAssets(category) {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const {
    data,
    isLoading: diagnosisAssetsLoading,
    error,
  } = useQuery({
    queryKey: [`diagnosis_assets${category ? '_category' : ''}`, category],
    queryFn: () => getDiagnosisAssets({ category, accessToken }),
    retry: 0,
    staleTime: 1000 * 10000,
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

  return { data: data ? data.data : [], error, diagnosisAssetsLoading };
}
