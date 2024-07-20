import { Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../../../utils/createOptionsFromArray';

import { useGetChoicesOptions } from '../../services/assets/useGetChoicesOptions';

import SelectField from '../../../../../ui/SelectField';
import InputField from '../../../../../ui/InputField';

function DirectionsInput({
  control,
  isLoading,
  disabled,
  errors,
  index,
  register,
}) {
  const { data, choicesAssetsLoading } = useGetChoicesOptions();

  const { frequency_choice, duration_choice } = data;
  const frequencyChoiceOptions = createOptionsFromArray(frequency_choice);
  const durationChoiceOptions = createOptionsFromArray(duration_choice);

  return (
    <div className="flex items-center gap-[0.5rem]">
      <div className="w-[70px]">
        <InputField
          type="number"
          min={1}
          disabled={disabled}
          register={register(`prescribed_drug.${index}.dose`, {
            required: true,
            min: 1,
          })}
          error={errors?.prescribed_drug?.[index]?.dose}
        />
      </div>
      <span className="basis-[10px]">×</span>
      <div className="w-[70px]">
        <InputField
          type="number"
          min={1}
          disabled={disabled}
          register={register(`prescribed_drug.${index}.frequency_num`, {
            required: true,
            min: 1,
          })}
          error={errors?.prescribed_drug?.[index]?.frequency_num}
        />
      </div>
      <span className="basis-[28px]">per</span>
      <Controller
        name={`prescribed_drug.${index}.frequency_choice`}
        control={control}
        render={({ field }) => (
          <SelectField
            field={field}
            isLoading={isLoading || choicesAssetsLoading}
            disabled={disabled || choicesAssetsLoading}
            options={frequencyChoiceOptions}
            error={errors?.prescribed_drug?.[index]?.frequency_choice}
          />
        )}
        rules={{
          required: true,
        }}
      />
      <span className="basis-[28px]">for</span>
      <div className="w-[70px]">
        <InputField
          type="number"
          min={1}
          disabled={disabled}
          register={register(`prescribed_drug.${index}.duration_num`, {
            required: true,
            min: 1,
          })}
          error={errors?.prescribed_drug?.[index]?.duration_num}
        />
      </div>
      <Controller
        name={`prescribed_drug.${index}.duration_choice`}
        control={control}
        render={({ field }) => (
          <SelectField
            field={field}
            isLoading={isLoading || choicesAssetsLoading}
            disabled={disabled || choicesAssetsLoading}
            options={durationChoiceOptions}
            error={errors?.prescribed_drug?.[index]?.duration_choice}
          />
        )}
        rules={{
          required: true,
        }}
      />
    </div>
  );
}

export default DirectionsInput;
