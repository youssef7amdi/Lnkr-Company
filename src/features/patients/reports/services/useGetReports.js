import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getReports } from '../../../../services/patient/reportsApi';

export function useReports() {
  const queryClient = useQueryClient();
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const pageNumber = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const { data, isLoading, error } = useQuery({
    queryKey: ['reports', pageNumber, id, accessToken],
    queryFn: () => getReports({ accessToken, page: pageNumber }),
    retry: 0,
  });

  // Pre Fetching Query
  if (pageNumber < data?.page?.pages)
    queryClient.prefetchQuery({
      queryKey: ['reports', pageNumber + 1, id, accessToken],
      queryFn: () => getReports({ accessToken, page: pageNumber + 1 }),
      staleTime: 10 * 1000,
    });
  if (pageNumber > 1)
    queryClient.prefetchQuery({
      queryKey: ['reports', pageNumber - 1, id, accessToken],
      queryFn: () => getReports({ accessToken, page: pageNumber - 1 }),
      staleTime: 10 * 1000,
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
