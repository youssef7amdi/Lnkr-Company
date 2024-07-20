import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { setLocalStorage } from '../../../utils/localStorageUtils';

import { login as loginApi } from '../../../services/authApi';

export function useLogin() {
  const { setCookie } = useCookiesAccess();

  const navigate = useNavigate();

  const { mutate: login, status: loginStatus } = useMutation({
    mutationFn: ({ mobile, password }) => loginApi({ mobile, password }),
    onSuccess: (data) => {
      if (data.success) {
        setCookie('access_token', data.data.access, {
          path: '/',
          // httpOnly: true,
          // secure: true,
        });
        setLocalStorage('dentist', data.data.dentist);
        navigate('/choose-clinic', { replace: true });
      }
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error(err.message);
    },
  });

  return { login, loginStatus };
}
