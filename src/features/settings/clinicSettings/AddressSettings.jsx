import { useForm } from 'react-hook-form';
import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import { settings } from '../../../data/data';
import { useState } from 'react';

function AddressSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { ...settings.clinic.address },
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
          id="country"
          type="text"
          register={register('country')}
          disabled={!isEditable}
          error={errors?.country}
        />
        <InputField
          id="city"
          type="text"
          register={register('city')}
          disabled={!isEditable}
          error={errors?.city}
        />
        <InputField
          id="district"
          type="text"
          register={register('district')}
          disabled={!isEditable}
          error={errors?.district}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="street"
          type="text"
          register={register('street')}
          disabled={!isEditable}
          error={errors?.street}
        />
        <InputField
          id="landmark"
          type="text"
          register={register('landmark')}
          disabled={!isEditable}
          error={errors?.landmark}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="Building No."
          type="text"
          register={register('buildingNumber')}
          disabled={!isEditable}
          error={errors?.buildingNumber}
        />
        <InputField
          id="Floor No."
          type="text"
          register={register('floorNumber')}
          disabled={!isEditable}
          error={errors?.floorNumber}
        />
        <InputField
          id="Apartment No."
          type="text"
          register={register('apartmentNumber')}
          disabled={!isEditable}
          error={errors?.apartmentNumber}
        />
      </div>
    </SettingsFormBox>
  );
}

export default AddressSettings;
