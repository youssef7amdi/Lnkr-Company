import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { getVisits } from '../../../services/more/visitsApi';

export function useGetVisits() {
  const queryClient = useQueryClient();
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();

  const pageNumber = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const { data, isLoading, error } = useQuery({
    queryKey: ['visits', pageNumber, accessToken],
    queryFn: () => getVisits({ accessToken, page: pageNumber }),
    retry: 0,
    staleTime: 1000 * 1000,
  });

  // Pre Fetching Query
  if (pageNumber < data?.page?.pages)
    queryClient.prefetchQuery({
      queryKey: ['visits', pageNumber + 1, accessToken],
      queryFn: () => getVisits({ accessToken, page: pageNumber + 1 }),
      staleTime: 1000 * 1000,
    });
  if (pageNumber > 1)
    queryClient.prefetchQuery({
      queryKey: ['visits', pageNumber - 1, accessToken],
      queryFn: () => getVisits({ accessToken, page: pageNumber - 1 }),
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

  return { data: data ? data : [], error, isLoading };
}
