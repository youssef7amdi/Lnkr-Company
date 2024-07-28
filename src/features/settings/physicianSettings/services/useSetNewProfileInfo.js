import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setProfileInfo } from '../../../../services/settings/physicianApi';

export function useSetNewProfileInfo() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { mutate: setNewProfileInfo, status: setNewProfileInfoStatus } =
    useMutation({
      mutationFn: (newProfileInfoObj) =>
        setProfileInfo(newProfileInfoObj, accessToken),
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Success, Profile info is updated successfully');
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

  return { setNewProfileInfo, setNewProfileInfoStatus };
}
