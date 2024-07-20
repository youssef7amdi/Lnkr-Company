import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setMedicalHistory as setMedicalHistoryApi } from '../../../../services/patient/medicalHistoryApi';

export function useSetNewHistory() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: setHistoryFn, status: setHistoryStatus } = useMutation({
    mutationFn: (newHistoryObj) =>
      setMedicalHistoryApi(newHistoryObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, new history added');
        queryClient.invalidateQueries(['medical_histories']);
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

  return { setHistoryFn, setHistoryStatus };
}
