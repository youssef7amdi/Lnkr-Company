import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';

function ProfessionalSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.physician.professional },
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
          id="Title"
          type="text"
          disabled={!isEditable}
          register={register('title')}
          error={errors?.title}
        />
        <InputField
          id="About"
          type="text"
          disabled={!isEditable}
          register={register('about')}
          error={errors?.about}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="Education"
          type="text"
          disabled={!isEditable}
          register={register('education')}
          error={errors?.education}
        />
        <InputField
          id="Profile Picture"
          type="text"
          disabled={!isEditable}
          register={register('profilePicture')}
          error={errors?.profilePicture}
        />
      </div>
    </SettingsFormBox>
  );
}

export default ProfessionalSettings;
