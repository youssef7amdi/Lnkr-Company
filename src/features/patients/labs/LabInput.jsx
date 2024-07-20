import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetLabAssets } from './services/assets/useGetLabAssets';

import SelectField from '../../../ui/SelectField';

function LabInput({ control, name, id, isLoading, disabled, category, error }) {
  const [nameDisabled, setNameDisabled] = useState(true);

  const { data, labAssetsLoading } = useGetLabAssets(category?.value);
  console.log(labAssetsLoading);
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

  // const categoryOptions = createOptionsFromArray(labAssetsData);
  useEffect(
    function () {
      if (category) {
        if (typeof data.at(0) === 'string') setNameDisabled(true);
        else setNameDisabled(false);
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
          isLoading={isLoading || labAssetsLoading}
          disabled={
            disabled || labAssetsLoading || category ? nameDisabled : null
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

export default LabInput;
