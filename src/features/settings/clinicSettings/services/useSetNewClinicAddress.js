import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setClinicAddress } from '../../../../services/settings/clinicApi';

export function useSetNewClinicAddress() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { mutate: setNewClinicAddress, status: setNewClinicAddressStatus } =
    useMutation({
      mutationFn: ({ newClinicAddressObj, method }) =>
        setClinicAddress({ newClinicAddressObj, method, accessToken }),
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Success, clinic Address is updated successfully');
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

  return { setNewClinicAddress, setNewClinicAddressStatus };
}
