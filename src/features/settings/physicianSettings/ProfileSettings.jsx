import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetProfileInfo } from './services/useGetProfileInfo';
import { useGetProfileTitleAssets } from './services/assets/useGetProfileTitleAssets';
import { useSetNewProfileInfo } from './services/useSetNewProfileInfo';

import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import SelectField from '../../../ui/SelectField';
import Spinner from '../../../ui/Spinner';

function ProfileSettings() {
  const [isEditable, setIsEditable] = useState(false);
  // Get Profile Data
  const { data: profile, isLoading: isLoading1 } = useGetProfileInfo();
  // Get Assets
  const { data: profileTitleAssets, profileTitleAssetsLoading } =
    useGetProfileTitleAssets();
  const profileTitleOptions = createOptionsFromArray(profileTitleAssets);
  // Set New Basic Info
  const { setNewProfileInfo, setNewProfileInfoStatus } = useSetNewProfileInfo();
  const isSubmitting = setNewProfileInfoStatus === 'pending';

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      title: { label: '', value: '' },
      full_name: '',
      education: '',
      about: '',
      profile_pic: '',
    },
    values: {
      ...profile,
      title: {
        label: profile.title ? profile.title : '',
        value: profile.title ? profile.title : '',
      },
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
    const newProfileInfoObj = {
      ...data,
      title: data.title.value,
    };
    setNewProfileInfo(newProfileInfoObj, {
      onSuccess: (data) => {
        // reset the default value to the new updated values
        reset({
          ...data.data,
          title: {
            label: data.data.title ? data.data.title : '',
            value: data.data.title ? data.data.title : '',
          },
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
      <div className="flex items-center gap-[3.2rem]">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <SelectField
              id="Title"
              field={field}
              isLoading={profileTitleAssetsLoading}
              disabled={
                !isEditable || profileTitleAssetsLoading || isSubmitting
              }
              options={profileTitleOptions}
              error={errors?.title}
            />
          )}
        />
        <InputField
          id="Full Name"
          type="text"
          placeholder={'ex: Youssef Hamdi AbdelAziem'}
          disabled={!isEditable || isSubmitting}
          register={register('full_name', {
            required: 'this field is required',
          })}
          error={errors?.full_name}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="Education"
          type="text"
          disabled={!isEditable || isSubmitting}
          register={register('education')}
          error={errors?.education}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <div className="flex w-full flex-col gap-[0.8rem]">
          <label className={`font-[500] capitalize`} htmlFor={'about'}>
            About
          </label>
          <textarea
            id="about"
            disabled={!isEditable || isSubmitting}
            {...register('about')}
            className={`h-[13rem] resize-none rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm focus:outline-brand-700`}
          ></textarea>
        </div>
      </div>
    </SettingsFormBox>
  );
}

export default ProfileSettings;
