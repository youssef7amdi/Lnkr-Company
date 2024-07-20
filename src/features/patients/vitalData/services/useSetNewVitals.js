import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setVitalData as setVitalDataApi } from '../../../../services/patient/vitalDataApi';

export function useSetNewVitals() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: setVitalsFn, status: setVitalsStatus } = useMutation({
    mutationFn: (newVitalsObj) => setVitalDataApi(newVitalsObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, new vitals added');
        queryClient.invalidateQueries(['vital_data']);
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

  return { setVitalsFn, setVitalsStatus };
}
