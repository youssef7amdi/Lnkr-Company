import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';
import Button from '../../../ui/Button';

function ShiftSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.physician.shift },
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
          id="Shift Name"
          type="text"
          disabled={!isEditable}
          register={register('name')}
          error={errors?.name}
        />
        <InputField
          id="Shift Description"
          type="text"
          disabled={!isEditable}
          register={register('description')}
          error={errors?.description}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="days"
          type="text"
          disabled={!isEditable}
          register={register('days')}
          error={errors?.days}
        />
        <InputField
          id="Starts At:"
          type="text"
          disabled={!isEditable}
          register={register('starts')}
          error={errors?.starts}
        />
        <InputField
          id="Ends At:"
          type="text"
          disabled={!isEditable}
          register={register('ends')}
          error={errors?.ends}
        />
      </div>
      <InputField
        id="Examination Period"
        type="text"
        disabled={!isEditable}
        register={register('examinationPeriod')}
        error={errors?.examinationPeriod}
      />
      <div className="flex justify-center">
        <Button type={'button'} sort={'primary'}>
          Add New Shift
        </Button>
      </div>
    </SettingsFormBox>
  );
}

export default ShiftSettings;
