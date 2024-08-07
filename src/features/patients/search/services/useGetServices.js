import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getServices } from '../../../../services/patient/searchApi';
import { useSearchParams } from 'react-router-dom';

export function useGetServices() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get('mobile');
  const accessToken = getCookie('access_token');

  const {
    data,
    isLoading: servicesLoading,
    error,
  } = useQuery({
    queryKey: ['services', mobile, accessToken],
    queryFn: () => getServices(accessToken),
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

  return { data: data ? data.data : [], error, servicesLoading };
}
