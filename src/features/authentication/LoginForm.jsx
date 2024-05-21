import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import { useLogin } from './useLogin';

import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
// import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  // const { login, loginStatus } = useLogin();
  // const isLoading = loginStatus === 'pending';
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      mobile: '00201112967597',
      password: 'Lnkr_123!',
    },
    mode: 'onSubmit',
  });

  const { errors } = formState;

  function onSubmit({ mobile, password }) {
    console.log('Mobile: ', mobile, '\nPassword: ', password);
    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="mobile"
        type="text"
        register={register('mobile', {
          pattern: {
            value: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
            message: 'Enter a Valid Number',
          },
          required: 'Mobile cannot be empty',
        })}
        error={errors?.mobile}
      />

      <InputField
        id="password"
        type="password"
        register={register('password', { required: "Password can't be empty" })}
        error={errors?.password}
      >
        <div className="text-gray-500">
          <Link className="text-[1.2rem] tracking-wide text-gray-500 underline hover:text-brand-700">
            Forgot Password?
          </Link>
        </div>
      </InputField>

      <div className="relative flex flex-col gap-[0.8rem] py-[1.2rem]">
        <Button
          sort="registration"
          type="submit"
          // disabled={isLoading}
        >
          {/* {!isLoading ? 'Log in' : <SpinnerMini />} */}
          Log in
        </Button>
      </div>
      <div className="text-gray-500">
        Did not have account?{' '}
        <Link
          to="/signup"
          className="ml-2 font-semibold text-brand-600 underline hover:text-brand-700"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
