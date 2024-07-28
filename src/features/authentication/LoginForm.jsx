import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

import { useLogin } from './services/useLogin';

import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectPhoneCode from '../../ui/SelectPhoneCode';
import ForwardedPatternFormat from '../../ui/ForwardedPatternFormat';

function LoginForm() {
  const { login, loginStatus } = useLogin();
  const isLoading = loginStatus === 'pending';

  const [searchOption, setSearchOption] = useState(CountryCodeOptions.at(0));

  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      mobile: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { errors } = formState;

  function onSubmit({ mobile, password }) {
    login({
      mobile: searchOption.value + mobile.replace(/\s+/g, ''),
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[1.5rem] flex w-full flex-col gap-[0.8rem]">
        <label
          className={`font-[500] capitalize ${errors.mobile ? 'text-red-600' : ''}`}
          htmlFor={'mobile'}
        >
          Mobile {errors.mobile ? <span className="text-red-600">*</span> : ''}
        </label>

        <div className="flex items-center gap-[0.8rem]">
          <SelectPhoneCode
            searchOption={searchOption}
            setSearchOption={setSearchOption}
            options={CountryCodeOptions}
          />

          <Controller
            control={control}
            name={'mobile'}
            render={({ field }) => (
              <ForwardedPatternFormat
                {...field}
                className={`grow rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm  ${errors.mobile ? 'outline-red-600' : 'focus:outline-brand-700'} rounded-md tracking-wide    `}
                id="mobile"
                format="### #### ###"
                placeholder={'Phone No..'}
                disabled={isLoading}
              />
            )}
            rules={{
              required: 'Mobile is required',
            }}
          />
        </div>
        {errors?.mobile?.message && (
          <span className="text-[1.4rem] text-red-700">
            {errors?.mobile?.message}
          </span>
        )}
      </div>

      <InputField
        id="password"
        type="password"
        disabled={isLoading}
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
        <Button sort="registration" type="submit" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </div>
      <div className="text-gray-500">
        Did not have account?
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

var CountryCodeOptions = [
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="EG"
          svg
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
          }}
          aria-label="Egypt"
          title="Egypt"
        />
        <span className="ml-[1rem] text-[1.3rem]">+20</span>
      </div>
    ),
    value: '0020',
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="sa"
          svg
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
          }}
          aria-label="Saudi Arabia"
          title="Saudi Arabia"
        />
        <span className="ml-[1rem] text-[1.3rem]">+966</span>
      </div>
    ),
    value: '00966',
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="ae"
          svg
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
          }}
          aria-label="Emirate"
          title="Emirate"
        />
        <span className="ml-[1rem] text-[1.3rem]">+971</span>
      </div>
    ),
    value: '00971',
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="Om"
          svg
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
          }}
          aria-label="Oman"
          title="Oman"
        />
        <span className="ml-[1rem] text-[1.3rem]">+968</span>
      </div>
    ),
    value: '00968',
  },
  {
    label: (
      <div>
        <ReactCountryFlag
          countryCode="LY"
          svg
          style={{
            fontSize: '2rem',
            lineHeight: '2rem',
          }}
          aria-label="Libya"
          title="Libya"
        />
        <span className="ml-[1rem] text-[1.3rem]">+218</span>
      </div>
    ),
    value: '00218',
  },
];
