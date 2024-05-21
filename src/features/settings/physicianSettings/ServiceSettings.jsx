import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';

function ServiceSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.physician.service },
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
          id="Service Name"
          type="text"
          disabled={!isEditable}
          register={register('name')}
          error={errors?.name}
        />
        <InputField
          id="Price"
          type="text"
          disabled={!isEditable}
          register={register('price')}
          error={errors?.price}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="Service Description"
          type="text"
          disabled={!isEditable}
          register={register('description')}
          error={errors?.description}
        />
      </div>
    </SettingsFormBox>
  );
}

export default ServiceSettings;
