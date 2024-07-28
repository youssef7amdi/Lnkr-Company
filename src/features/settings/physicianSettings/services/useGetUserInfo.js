import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getUserInfo } from '../../../../services/settings/physicianApi';

export function useGetUserInfo() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { data, isLoading, error } = useQuery({
    queryKey: ['physician_userInfo'],
    queryFn: () => getUserInfo(accessToken),
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
