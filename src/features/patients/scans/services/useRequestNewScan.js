import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { requestScan as requestScanApi } from '../../../../services/patient/scansApi';

export function useRequestNewScan() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: requestScanFn, status: requestScanStatus } = useMutation({
    mutationFn: (newScanObj) => requestScanApi(newScanObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, new scan requested');
        queryClient.invalidateQueries(['scans']);
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

  return { requestScanFn, requestScanStatus };
}
