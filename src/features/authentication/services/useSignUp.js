import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { signUp as signUpApi } from '../../../services/authApi';

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUp, status: signUpStatus } = useMutation({
    mutationFn: (signUpObject) => signUpApi(signUpObject),
    onSuccess: (data) => {
      if (data.success) {
        navigate('/login', { replace: true });
        toast.success('Sign up Successfully, please log in');
      }
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error(err.message);
    },
  });

  return { signUp, signUpStatus };
}
