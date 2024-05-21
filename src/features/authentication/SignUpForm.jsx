import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';

function SignUpForm() {
  const [indexToShow, setIndexToShow] = useState(0);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, trigger } = useForm({
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
      } else if (indexToShow == 1) {
        trigger(
          [
            'clinicName',
            'clinicPhone',
            'country',
            'city',
            'district',
            'street',
            'landmark',
            'building',
            'floor',
            'apartment',
          ],
          {
            shouldFocus: true,
          },
        );
      }
    }
    function goNext() {
      if (isValid && indexToShow < 2) setIndexToShow((prev) => prev + 1);
    }
  }
  function previousSection() {
    if (indexToShow > 0) setIndexToShow((prev) => prev - 1);
  }

  function onSubmit(data) {
    trigger('examinationFee', {
      shouldFocus: true,
    });
    console.log(data);
    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexToShow == 0 && (
        <section className="flex flex-col gap-[1rem]">
          <InputField
            id="full Name"
            type="text"
            register={register('fullName', {
              required: 'This Field is Required',
            })}
            error={errors?.fullName}
          />

          <InputField
            id="mobile"
            type="text"
            register={register('mobile', {
              pattern: {
                value: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
                message: 'Enter a Valid Phone Number',
              },
              required: 'Mobile cannot be empty',
            })}
            error={errors?.mobile}
          />

          <InputField
            id="password"
            type="password"
            register={register('password', {
              required: "Password can't be empty",
            })}
            error={errors?.password}
          />

          <InputField
            id="specialty"
            type="text"
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
            register={register('clinicName', {
              required: 'This Field is Required',
            })}
            error={errors?.clinicName}
          />

          <InputField
            id="Clinic Phone No."
            type="number"
            register={register('clinicPhone', {
              pattern: {
                value: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
                message: 'Enter a Valid Phone Number',
              },
              required: 'Mobile cannot be empty',
            })}
            error={errors?.clinicPhone}
          />

          <label className="mt-[1.6rem] text-[1.8rem] font-[600]">
            Clinic Address:
          </label>
          <div className="flex gap-x-[1.2rem]">
            <InputField
              id="country"
              type="text"
              register={register('country', {
                required: true,
              })}
              error={errors?.country}
            />
            <InputField
              id="city"
              type="text"
              register={register('city', {
                required: true,
              })}
              error={errors?.city}
            />
            <InputField
              id="district"
              type="text"
              register={register('district', {
                required: true,
              })}
              error={errors?.district}
            />
          </div>

          <div className="flex gap-x-[1.2rem]">
            <InputField
              id="street"
              type="text"
              register={register('street', {
                required: true,
              })}
              error={errors?.street}
            />
            <InputField
              id="landmark"
              type="text"
              register={register('landmark', {
                required: true,
              })}
              error={errors?.landmark}
            />
          </div>

          <div className="flex gap-x-[1.2rem]">
            <InputField
              id="building No."
              type="text"
              register={register('building', {
                required: true,
              })}
              error={errors?.building}
            />
            <InputField
              id="floor No."
              type="text"
              register={register('floor', {
                required: true,
              })}
              error={errors?.floor}
            />
            <InputField
              id="apartment No."
              type="text"
              register={register('apartment', {
                required: true,
              })}
              error={errors?.apartment}
            />
          </div>
        </section>
      )}

      {indexToShow == 2 && (
        <section className="flex flex-col gap-[1rem]">
          <InputField
            id="examination Fee"
            type="text"
            register={register('examinationFee', {
              required: true,
            })}
            error={errors?.examinationFee}
          />
        </section>
      )}

      <div className="relative flex flex-row justify-end gap-[0.8rem] py-[1.2rem]">
        <Button
          sort="registration"
          type="button"
          onClick={previousSection}
          disabled={indexToShow == 0}
        >
          previous
        </Button>
        {indexToShow < 2 && (
          <Button
            sort="registration"
            type="button"
            onClick={nextSection}
            disabled={indexToShow == 2}
          >
            {console.log(Object.keys(errors))}
            Next
          </Button>
        )}
        {indexToShow == 2 && (
          <Button
            sort="registration"
            type="submit"
            // disabled={isLoading}
          >
            {/* {!isLoading ? 'Log in' : <SpinnerMini />} */}
            Sign Up
          </Button>
        )}
      </div>
    </form>
  );
}

export default SignUpForm;
