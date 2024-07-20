import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useCookiesAccess } from '../../../../contexts/CookiesAccessProvider';
import { useBasicInfoAccess } from '../../../../contexts/PatientInfoProvider';

import { chooseService as chooseServiceApi } from '../../../../services/patient/searchApi';

export function useChooseService() {
  const { getCookie, removeCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');
  const navigate = useNavigate();
  const { setBasicInfo } = useBasicInfoAccess();

  const { mutate: chooseServiceFn, status: chooseServiceStatus } = useMutation({
    mutationFn: (serviceObject) => chooseServiceApi(serviceObject, accessToken),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Success, You can access the profile');
        setBasicInfo(data.data);
        navigate(`../${data.data.patient.mobile}`);
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

  return { chooseServiceFn, chooseServiceStatus };
}
