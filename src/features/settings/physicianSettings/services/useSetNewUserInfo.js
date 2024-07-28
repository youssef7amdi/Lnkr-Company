import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';

import { setUserInfo } from '../../../../services/settings/physicianApi';

export function useSetNewUserInfo() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  const { mutate: setNewUserInfo, status: setNewUserInfoStatus } = useMutation({
    mutationFn: (newUserInfoObj) => setUserInfo(newUserInfoObj, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, User info is updated successfully');
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

  return { setNewUserInfo, setNewUserInfoStatus };
}
