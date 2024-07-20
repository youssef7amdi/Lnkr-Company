import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../contexts/CookiesAccessProvider';

import { chooseClinic as chooseClinicApi } from '../../../services/authApi';

export function useChooseClinic() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const navigate = useNavigate();

  const { mutate: chooseClinic, status: chooseClinicStatus } = useMutation({
    mutationFn: (clinicObject) => chooseClinicApi(clinicObject, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Clinic is Chosen successfully');
        navigate('/dashboard');
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

  return { chooseClinic, chooseClinicStatus };
}
