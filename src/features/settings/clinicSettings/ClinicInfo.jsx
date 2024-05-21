import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';

function ClinicInfo() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.clinic.basicInfo },
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
          id="Clinic Title"
          type="text"
          disabled={!isEditable}
          register={register('clinicTitle')}
          error={errors?.clinicTitle}
        />
        <InputField
          id="Clinic Name"
          type="text"
          disabled={!isEditable}
          register={register('name')}
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
        <InputField
          id="Phone Number"
          type="tel"
          disabled={!isEditable}
          register={register('phone')}
          error={errors?.phone}
        />
      </div>
      <InputField
        id="Logo"
        type="text"
        disabled={!isEditable}
        register={register('logo')}
        error={errors?.logo}
      />
    </SettingsFormBox>
  );
}

export default ClinicInfo;
