import LoginForm from '../features/authentication/LoginForm';
import RegistrationLayout from '../ui/RegistrationLayout';

function Login() {
  return (
    <RegistrationLayout pageHeading="Log into your account">
      <LoginForm />
    </RegistrationLayout>
  );
}

export default Login;
