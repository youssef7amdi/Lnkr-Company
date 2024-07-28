import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetClinicAddress } from './services/useGetClinicAddress';
import { useSetNewClinicAddress } from './services/useSetNewClinicAddress';

import CityInput from './CityInput';

import InputField from '../../../ui/InputField';
import SettingsFormBox from '../../../ui/SettingsFormBox';
import Spinner from '../../../ui/Spinner';

function AddressSettings() {
  const [isEditable, setIsEditable] = useState(false);
  // Get Address Info Data
  const { data: clinicAddressInfo, isLoading: isLoading1 } =
    useGetClinicAddress();
  // Set New Address
  const { setNewClinicAddress, setNewClinicAddressStatus } =
    useSetNewClinicAddress();
  const isSubmitting = setNewClinicAddressStatus === 'pending';

  const { register, handleSubmit, reset, watch, control, formState } = useForm({
    defaultValues: {
      country: 'Egypt',
      city: { label: '', value: '' },
      district: { label: '', value: '' },
      street: '',
      landmark: '',
      building: '',
      floor: '',
      apartment: '',
      directions: '',
    },
    // update values when get
    values: clinicAddressInfo
      ? {
          ...clinicAddressInfo,
          city: {
            label: clinicAddressInfo.city,
            value: clinicAddressInfo.city,
          },
          district: {
            label: clinicAddressInfo.district,
            value: clinicAddressInfo.district,
          },
        }
      : {},
    mode: 'onSubmit',
  });

  const { errors, dirtyFields } = formState;

  if (isLoading1) return <Spinner />;

  function onClose() {
    reset();
    setIsEditable(false);
  }
  function onSave(data) {
    const newClinicAddressObj = {
      country: data.country,
      city: data.city.value,
      district: data.district.value,
      street: data.street,
      landmark: data.landmark,
      building: Number(data.building),
      floor: Number(data.floor),
      apartment: Number(data.apartment),
      directions: data.directions,
    };
    const method = clinicAddressInfo ? 'PUT' : 'POST';
    setNewClinicAddress(
      { newClinicAddressObj, method },
      {
        onSuccess: (data) => {
          // reset the default value to the new updated values
          reset({
            ...data.data,
            city: { label: data.data.city, value: data.data.city },
            district: { label: data.data.district, value: data.data.district },
          });
          setIsEditable(false);
        },
      },
    );
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
          id="Country"
          type="text"
          register={register('country')}
          disabled={!isEditable || isSubmitting}
          error={errors?.country}
        />
        <CityInput
          disabled={!isEditable || isSubmitting}
          name={`city`}
          control={control}
          id="City"
          error={errors?.city}
        />
        <CityInput
          city={watch(`city`)}
          disabled={!isEditable || !dirtyFields[`city`] || isSubmitting}
          name={`district`}
          control={control}
          id="District"
          error={errors?.district}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="street"
          type="text"
          register={register('street', { required: 'required' })}
          disabled={!isEditable || isSubmitting}
          error={errors?.street}
        />
        <InputField
          id="landmark"
          type="text"
          register={register('landmark')}
          disabled={!isEditable || isSubmitting}
          error={errors?.landmark}
        />
      </div>
      <div className="flex  items-center gap-[3.2rem]">
        <InputField
          id="Building No."
          type="text"
          register={register('building', { required: 'required' })}
          disabled={!isEditable || isSubmitting}
          error={errors?.building}
        />
        <InputField
          id="Floor No."
          type="text"
          register={register('floor', { required: 'required' })}
          disabled={!isEditable || isSubmitting}
          error={errors?.floor}
        />
        <InputField
          id="Apartment No."
          type="text"
          register={register('apartment', { required: 'required' })}
          disabled={!isEditable || isSubmitting}
          error={errors?.apartment}
        />
      </div>
    </SettingsFormBox>
  );
}

export default AddressSettings;
