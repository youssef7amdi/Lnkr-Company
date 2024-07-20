import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCookiesAccess } from '../contexts/CookiesAccessProvider';

import LoginForm from '../features/authentication/LoginForm';

import RegistrationLayout from '../ui/RegistrationLayout';
import Spinner from '../ui/Spinner';

function Login() {
  const { getCookie } = useCookiesAccess();
  const navigate = useNavigate();
  const isAuthenticated = getCookie('access_token');

  useEffect(
    function () {
      if (isAuthenticated) navigate('/dashboard');
    },
    [isAuthenticated, navigate],
  );

  if (!isAuthenticated)
    return (
      <RegistrationLayout pageHeading="Log into your account">
        <LoginForm />
      </RegistrationLayout>
    );

  return (
    <div className="flex h-[100dvh] items-center justify-center bg-gray-50">
      <Spinner />
    </div>
  );
}

export default Login;
