import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCookiesAccess } from '../contexts/CookiesAccessProvider';

import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { getCookie } = useCookiesAccess();
  const navigate = useNavigate();
  const isAuthenticated = getCookie('access_token');

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/login');
    },
    [isAuthenticated, navigate],
  );

  if (isAuthenticated) return children;

  return (
    <div className="flex h-[100dvh] items-center justify-center bg-gray-50">
      <Spinner />
    </div>
  );
}

export default ProtectedRoute;
