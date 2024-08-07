import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getVitalData } from '../../../../services/patient/vitalDataApi';

export function useGetVitalDataItem(query) {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['vital_data_item', id, query, accessToken],
    queryFn: () => getVitalData({ accessToken, query }),
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
