import SignUpForm from '../features/authentication/SignUpForm';

import RegistrationLayout from '../ui/RegistrationLayout';

function SignUp() {
  return (
    <RegistrationLayout pageHeading="Sign up new account">
      <SignUpForm />
    </RegistrationLayout>
  );
}

export default SignUp;
