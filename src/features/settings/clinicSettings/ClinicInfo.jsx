import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetClinicBasicInfo } from './services/useGetClinicBasicInfo';
import { useGetClinicTitleAssets } from './services/assets/useGetClinicTitleAssets';
import { useSetNewClinicInfo } from './services/useSetNewClinicInfo';

import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import Spinner from '../../../ui/Spinner';
import SelectField from '../../../ui/SelectField';
import ForwardedPatternFormat from '../../../ui/ForwardedPatternFormat';

function ClinicInfo() {
  const [isEditable, setIsEditable] = useState(false);
  // Get Basic Info Data
  const { data: clinicBasicInfo, isLoading: isLoading1 } =
    useGetClinicBasicInfo();
  // Get Assets
  const { data: clinicTitleAssets, clinicTitleAssetsLoading } =
    useGetClinicTitleAssets();
  const clinicTitleOptions = createOptionsFromArray(clinicTitleAssets);
  // Set New Basic Info
  const { setNewClinicInfo, setNewClinicInfoStatus } = useSetNewClinicInfo();
  const isSubmitting = setNewClinicInfoStatus === 'pending';

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      name: '',
      title: { label: '', value: '' },
      phone_num: null,
      about: null,
    },
    // update values when get
    values: {
      ...clinicBasicInfo,
      title: {
        label: clinicBasicInfo.title ? clinicBasicInfo.title : '',
        value: clinicBasicInfo.title ? clinicBasicInfo.title : '',
      },
    },
    mode: 'onSubmit',
  });

  if (isLoading1) return <Spinner />;

  const { errors } = formState;

  function onClose() {
    reset();
    setIsEditable(false);
  }
  function onSave(data) {
    const newClinicBasicInfoObj = {
      ...data,
      phone_num: data.phone_num.replace(/\s+/g, ''),
      title: data.title.value,
    };
    setNewClinicInfo(newClinicBasicInfoObj, {
      onSuccess: (data) => {
        // reset the default value to the new updated values
        reset({
          ...data.data,
          title: { label: data.data.title, value: data.data.title },
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
              isLoading={clinicTitleAssetsLoading}
              disabled={!isEditable || clinicTitleAssetsLoading || isSubmitting}
              options={clinicTitleOptions}
              error={errors?.title}
            />
          )}
          rules={{
            required: 'this field is required',
          }}
        />
        <InputField
          id="Clinic Name"
          type="text"
          placeholder={'ex: Dr Youssef Hamdi'}
          disabled={!isEditable || isSubmitting}
          register={register('name', { required: 'this field is required' })}
          error={errors?.name}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="About"
          type="text"
          disabled={!isEditable || isSubmitting}
          register={register('about')}
          error={errors?.about}
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
            name={'phone_num'}
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
          />
        </div>
      </div>
    </SettingsFormBox>
  );
}

export default ClinicInfo;
