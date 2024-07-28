import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setClinicBasicInfo } from '../../../../services/settings/clinicApi';

export function useSetNewClinicInfo() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { mutate: setNewClinicInfo, status: setNewClinicInfoStatus } =
    useMutation({
      mutationFn: (newClinicBasicInfoObj) =>
        setClinicBasicInfo(newClinicBasicInfoObj, accessToken),
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Success, clinic info is updated successfully');
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

  return { setNewClinicInfo, setNewClinicInfoStatus };
}
