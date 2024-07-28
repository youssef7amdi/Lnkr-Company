import { Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetAddressAssets } from './services/assets/useGetAddressAssets';

import SelectField from '../../../ui/SelectField';

function CityInput({ control, name, id, isLoading, disabled, city, error }) {
  const { data, addressAssetsLoading } = useGetAddressAssets(city?.value);

  const cityOptions = createOptionsFromArray(data);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectField
          id={id}
          field={field}
          isLoading={isLoading || addressAssetsLoading}
          disabled={disabled || addressAssetsLoading}
          options={cityOptions}
          isSearchable={true}
          error={error}
        />
      )}
      rules={{
        required: 'This field is Required',
      }}
    />
  );
}

export default CityInput;
