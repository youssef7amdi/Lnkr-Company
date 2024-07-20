import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { requestLab as requestLabApi } from '../../../../services/patient/labsApi';

export function useRequestNewLab() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: requestLabFn, status: requestLabStatus } = useMutation({
    mutationFn: (newLabObj) => requestLabApi(newLabObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, new lab requested');
        queryClient.invalidateQueries(['labs']);
      }
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error(err.message);
      if (
        err?.message === 'No Permission Here' ||
        err?.message === 'Log in expired, Please Log in again'
      ) {
        removeCookie('access_token');
      }
    },
  });

  return { requestLabFn, requestLabStatus };
}
