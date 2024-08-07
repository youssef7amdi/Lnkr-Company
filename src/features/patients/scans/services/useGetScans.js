import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getScans } from '../../../../services/patient/scansApi';

export function useScans() {
  const queryClient = useQueryClient();
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ? searchParams.get('type') : 'imaging';

  const pageNumber = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: [`scans`, pageNumber, id, type, accessToken],
    queryFn: () =>
      getScans({
        accessToken,
        type,
        page: pageNumber,
      }),
    retry: 0,
    staleTime: 1000 * 10,
  });

  // Pre Fetching Query
  if (pageNumber < data?.page?.pages)
    queryClient.prefetchQuery({
      queryKey: ['scans', pageNumber + 1, id, type, accessToken],
      queryFn: () =>
        getScans({
          accessToken,
          type,
          page: pageNumber + 1,
        }),
      staleTime: 10 * 1000,
    });
  if (pageNumber > 1)
    queryClient.prefetchQuery({
      queryKey: ['scans', pageNumber - 1, id, type, accessToken],
      queryFn: () =>
        getScans({
          accessToken,
          type,
          page: pageNumber - 1,
        }),
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
