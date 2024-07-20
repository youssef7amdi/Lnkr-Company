import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { getMedicalHistory } from '../../../../services/patient/medicalHistoryApi';

export function useGetMedicalHistory() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['medical_histories', id],
    queryFn: () => getMedicalHistory({ accessToken }),
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
