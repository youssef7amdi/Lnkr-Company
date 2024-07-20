import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getLabs } from '../../../../services/patient/labsApi';

export function useGetLabItem(query) {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['lab_item', id, query, type],
    queryFn: () => getLabs({ query, accessToken, type }),
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
