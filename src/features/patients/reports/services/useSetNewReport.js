import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setReport as setReportApi } from '../../../../services/patient/reportsApi';

export function useSetNewReport() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: setReportFn, status: setReportStatus } = useMutation({
    mutationFn: (newReportObj) => setReportApi(newReportObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, new report added');
        queryClient.invalidateQueries(['reports']);
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

  return { setReportFn, setReportStatus };
}
