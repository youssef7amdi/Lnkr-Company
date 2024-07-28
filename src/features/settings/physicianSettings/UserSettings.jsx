import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGetUserInfo } from './services/useGetUserInfo';
import { useSetNewUserInfo } from './services/useSetNewUserInfo';

import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import ForwardedPatternFormat from '../../../ui/ForwardedPatternFormat';
import Spinner from '../../../ui/Spinner';

function UserSettings() {
  const [isEditable, setIsEditable] = useState(false);
  // Get User Info Data
  const { data: userInfo, isLoading: isLoading1 } = useGetUserInfo();
  // Set New User Info
  const { setNewUserInfo, setNewUserInfoStatus } = useSetNewUserInfo();
  const isSubmitting = setNewUserInfoStatus === 'pending';

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      email: '',
      mobile: '',
    },
    values: {
      ...userInfo,
    },
    mode: 'onSubmit',
  });

  const { errors } = formState;

  if (isLoading1) return <Spinner />;

  function onClose() {
    reset();
    setIsEditable(false);
  }
  function onSave(data) {
    const newUserInfoObj = {
      ...data,
      mobile: data.mobile.replace(/\s+/g, ''),
    };
    setNewUserInfo(newUserInfoObj, {
      onSuccess: (data) => {
        // reset the default value to the new updated values
        reset({
          ...data.data,
        });
        setIsEditable(false);
      },
    });
  }

  return (
    <SettingsFormBox
      isEditable={isEditable}
      setIsEditable={setIsEditable}
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
    >
      <InputField
        id="Email"
        type="email"
        disabled={!isEditable || isSubmitting}
        register={register('email')}
        error={errors?.email}
      />
      <div className="mb-[1.5rem] flex w-full flex-col gap-[0.8rem]">
        <label
          className={`font-[500] capitalize ${errors.phone_num ? 'text-red-600' : ''}`}
          htmlFor={'Phone Number'}
        >
          Phone Number
        </label>
        <Controller
          control={control}
          name={'mobile'}
          render={({ field }) => (
            <ForwardedPatternFormat
              {...field}
              className={`grow rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm  ${errors.phone_num ? 'outline-red-600' : 'focus:outline-brand-700'} rounded-md tracking-wide    `}
              id="Phone Number"
              format="#### ### #### ###"
              placeholder={'Phone No..'}
              disabled={!isEditable || isSubmitting}
            />
          )}
          rules={{
            required: 'This field is Required',
          }}
        />
      </div>
    </SettingsFormBox>
  );
}

export default UserSettings;
