import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import SelectFilter from '../../../ui/SelectFilter';
import { useState } from 'react';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

function ProfileSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.physician.profile },
    mode: 'onSubmit',
  });

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
        <InputField
          id="Full Name"
          type="text"
          disabled={!isEditable}
          register={register('fullName')}
          error={errors?.fullName}
        />
        <InputField
          id="National ID"
          type="text"
          disabled={!isEditable}
          register={register('nationalId')}
          error={errors?.nationalId}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <SelectFilter
          id="Gender"
          disabled={!isEditable}
          register={register('gender')}
          options={genderOptions}
          error={errors?.gender}
        />
        <InputField
          id="Birth"
          type="text"
          disabled={!isEditable}
          register={register('birthDate')}
          error={errors?.birthDate}
        />
      </div>
    </SettingsFormBox>
  );
}

export default ProfileSettings;
