import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setPrescription as setPrescriptionApi } from '../../../../services/patient/prescriptionApi';

export function useSetNewPrescription() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const queryClient = useQueryClient();

  const { mutate: setPrescriptionFn, status: setPrescriptionStatus } =
    useMutation({
      mutationFn: (newPrescriptionObj) =>
        setPrescriptionApi({ newPrescriptionObj, accessToken }),
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Success, new Prescription added');
          queryClient.invalidateQueries(['prescriptions']);
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

  return { setPrescriptionFn, setPrescriptionStatus };
}
