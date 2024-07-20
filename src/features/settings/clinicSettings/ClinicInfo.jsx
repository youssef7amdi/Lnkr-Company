import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetClinicBasicInfo } from './services/useGetClinicBasicInfo';
import { useGetClinicTitleAssets } from './services/assets/useGetClinicTitleAssets';

import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import Spinner from '../../../ui/Spinner';
import SelectField from '../../../ui/SelectField';
import ForwardedPatternFormat from '../../../ui/ForwardedPatternFormat';

function ClinicInfo() {
  const [isEditable, setIsEditable] = useState(false);
  const { data: clinicBasicInfo, isLoading: isLoading1 } =
    useGetClinicBasicInfo();
  const { data: clinicTitleAssets, isLoading: isLoading2 } =
    useGetClinicTitleAssets();
  const clinicTitleOptions = createOptionsFromArray(clinicTitleAssets);

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: {
      name: '',
      title: { label: '', value: '' },
      phone_num: null,
      about: null,
    },
    values: {
      ...clinicBasicInfo,
      title: { label: clinicBasicInfo.title, value: clinicBasicInfo.title },
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
    console.log(data);
    setIsEditable(false);
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
              isLoading={isLoading2}
              disabled={!isEditable || isLoading2}
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
          disabled={!isEditable}
          register={register('name', { required: 'this field is required' })}
          error={errors?.name}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="About"
          type="text"
          disabled={!isEditable}
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
                format="#### ### #### ####"
                placeholder={'Phone No..'}
                disabled={!isEditable}
              />
            )}
          />
        </div>
      </div>
    </SettingsFormBox>
  );
}

export default ClinicInfo;
