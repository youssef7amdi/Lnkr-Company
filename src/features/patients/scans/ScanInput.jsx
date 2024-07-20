import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetScanAssets } from './services/assets/useGetScanAssets';

import SelectField from '../../../ui/SelectField';

function ScanInput({
  control,
  name,
  id,
  isLoading,
  disabled,
  category,
  error,
}) {
  const [nameDisabled, setNameDisabled] = useState(true);

  const { data, scanAssetsLoading } = useGetScanAssets(category?.value);
  let options = (function () {
    if (typeof data.at(0) == 'string') {
      return createOptionsFromArray(data);
    } else {
      return data.map((item) => ({
        label: item.name_en,
        value: item.name_en,
        code: item.code,
      }));
    }
  })();

  useEffect(
    function () {
      if (category) {
        if (typeof data.at(0) != 'string') return setNameDisabled(false);
        else return setNameDisabled(true);
      } else return;
    },
    [category, data],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectField
          id={id}
          field={field}
          isLoading={isLoading || scanAssetsLoading}
          disabled={
            disabled || scanAssetsLoading || category ? nameDisabled : null
          }
          options={options}
          isSearchable={true}
          error={error}
        />
      )}
      rules={{
        required: 'This Field is required',
      }}
    />
  );
}

export default ScanInput;
