import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import ReactCountryFlag from 'react-country-flag';

import { useSignUp } from './services/useSignUp';

import SelectSpecialty from './SelectSpecialty';

import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectPhoneCode from '../../ui/SelectPhoneCode';
import ForwardedPatternFormat from '../../ui/ForwardedPatternFormat';

function SignUpForm() {
  const [indexToShow, setIndexToShow] = useState(0);
  const { signUp, signUpStatus } = useSignUp();
  const isLoading = signUpStatus == 'pending';

  const [searchOption, setSearchOption] = useState(CountryCodeOptions.at(0));

  const { register, handleSubmit, trigger, formState, control } = useForm({
    mode: 'onBlur',
  });

  const { errors, isValid } = formState;

  function nextSection() {
    triggerErrors();
    goNext();

    function triggerErrors() {
      if (indexToShow == 0) {
        trigger(['fullName', 'mobile', 'password', 'specialty'], {
          shouldFocus: true,
        });
      }
    }
    function goNext() {
      if (isValid && indexToShow < 1) setIndexToShow((prev) => prev + 1);
    }
  }
  function previousSection() {
    if (indexToShow > 0) setIndexToShow((prev) => prev - 1);
  }

  function onSubmit(data) {
    trigger(
      ['clinicName', 'clinicPhone', 'examination_price', 'followUp_price'],
      {
        shouldFocus: true,
      },
    );
    const signUpObject = {
      dentist: {
        full_name: data.fullName,
        mobile: searchOption.value + data.mobile.replace(/\s+/g, ''),
        password: data.password,
      },
      specialty: data.specialty,
      clinic: {
        name: data.clinicName,
        phone_num: data.clinicPhone.replace(/\s+/g, ''),
      },
      pricing: {
        'In Clinic - Examination': {
          base_price: data.examination_price,
        },
        'In Clinic - Follow Up': {
          base_price: data.followUp_price,
        },
      },
    };

    signUp(signUpObject);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexToShow == 0 && (
        <section className="flex flex-col gap-[1rem]">
          <InputField
            id="full Name"
            placeholder="ex: Youssef Hamdi AbdelAziem"
            type="text"
            disabled={isLoading}
            register={register('fullName', {
              required: 'This Field is Required',
            })}
            error={errors?.fullName}
          />

          <div className=" flex w-full flex-col gap-[0.8rem]">
            <label
              className={`font-[500] capitalize ${errors.mobile ? 'text-red-600' : ''}`}
              htmlFor={'mobile'}
            >
              Mobile{' '}
              {errors.mobile ? <span className="text-red-600">*</span> : ''}
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
                    placeholder={'Phone No..'}
                    disabled={isLoading}
                    format="### #### ###"
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
            register={register('password', {
              required: "Password can't be empty",
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.\w/,
                message: `should have at least 1 capital, 1 small, 1 number, 1 special character`,
              },
            })}
            error={errors?.password}
          />

          <SelectSpecialty
            id="specialty"
            disabled={isLoading}
            register={register('specialty', {
              required: 'This Field is Required',
            })}
            error={errors?.specialty}
          />
        </section>
      )}
      {indexToShow == 1 && (
        <section className="flex flex-col gap-[1rem]">
          <InputField
            id="clinic Name"
            type="text"
            placeholder="ex: Dr Youssef Hamdi"
            disabled={isLoading}
            register={register('clinicName', {
              required: 'This Field is Required',
            })}
            error={errors?.clinicName}
          />

          <div className=" flex w-full flex-col gap-[0.8rem]">
            <label
              className={`font-[500] capitalize ${errors.clinicPhone ? 'text-red-600' : ''}`}
              htmlFor={'clinicPhone'}
            >
              Clinic Phone No.{' '}
              {errors.clinicPhone ? (
                <span className="text-red-600">*</span>
              ) : (
                ''
              )}
            </label>

            <div className="flex items-center gap-[0.8rem]">
              <SelectPhoneCode
                searchOption={searchOption}
                setSearchOption={setSearchOption}
                options={CountryCodeOptions}
              />

              <Controller
                control={control}
                name={'clinicPhone'}
                render={({ field }) => (
                  <ForwardedPatternFormat
                    {...field}
                    className={`grow rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm  ${errors.clinicPhone ? 'outline-red-600' : 'focus:outline-brand-700'} rounded-md tracking-wide    `}
                    id="clinicPhone"
                    placeholder={'Clinic Phone No..'}
                    disabled={isLoading}
                    format="### #### ###"
                  />
                )}
                rules={{
                  required: 'This Field is required',
                }}
              />
            </div>
            {errors?.clinicPhone?.message && (
              <span className="text-[1.4rem] text-red-700">
                {errors?.clinicPhone?.message}
              </span>
            )}
          </div>

          {/* <InputField
            id="Clinic Phone No."
            type="text"
            placeholder="Clinic phone.."
            disabled={isLoading}
            register={register('clinicPhone', {
              required: 'Mobile cannot be empty',
            })}
            error={errors?.clinicPhone}
          /> */}

          <label className="mt-[1.6rem] text-[1.8rem] font-[600]">
            Pricing:
          </label>
          <InputField
            id="In Clinic - Examination"
            type="number"
            disabled={isLoading}
            register={register('examination_price', {
              required: 'This Field is Required',
            })}
            error={errors?.examination_price}
          />
          <InputField
            id="In Clinic - Follow Up"
            type="number"
            disabled={isLoading}
            register={register('followUp_price', {
              required: 'This Field is Required',
            })}
            error={errors?.followUp_price}
          />
        </section>
      )}
      <div className="relative flex flex-row justify-end gap-[0.8rem] py-[1.2rem]">
        <Button
          sort="registration"
          type="button"
          onClick={previousSection}
          disabled={indexToShow == 0 || isLoading}
        >
          previous
        </Button>
        {indexToShow < 1 && (
          <Button
            sort="registration"
            type="button"
            onClick={nextSection}
            disabled={indexToShow == 2}
          >
            Next
          </Button>
        )}
        {indexToShow == 1 && (
          <Button sort="registration" type="submit" disabled={isLoading}>
            {!isLoading ? 'Sign Up' : <SpinnerMini />}
          </Button>
        )}
      </div>
      <div className="text-gray-500">
        Did not have account?
        <Link
          to="/login"
          className="ml-2 font-semibold text-brand-600 underline hover:text-brand-700"
        >
          Log In
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;

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
