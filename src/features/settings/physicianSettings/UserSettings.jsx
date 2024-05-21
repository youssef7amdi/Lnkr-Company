import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';

function UserSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.physician.user },
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
      <InputField
        id="Email"
        type="email"
        disabled={!isEditable}
        register={register('email')}
        error={errors?.email}
      />
      <InputField
        id="Phone"
        type="text"
        disabled={!isEditable}
        register={register('mobile')}
        error={errors?.mobile}
      />
    </SettingsFormBox>
  );
}

export default UserSettings;
