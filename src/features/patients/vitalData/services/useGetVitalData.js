import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getVitalData } from '../../../../services/patient/vitalDataApi';
import { useParams } from 'react-router-dom';

export function useGetVitalData() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['vital_data', id],
    queryFn: () => getVitalData({ accessToken }),
    retry: 0,
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
