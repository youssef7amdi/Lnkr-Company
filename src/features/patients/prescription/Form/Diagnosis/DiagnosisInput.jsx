import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../../../utils/createOptionsFromArray';

import { useGetDiagnosisAssets } from '../../services/assets/useGetDiagnosisAssets';

import SelectField from '../../../../../ui/SelectField';

function DiagnosisInput({
  control,
  name,
  id,
  isLoading,
  disabled,
  category,
  error,
}) {
  const [diseaseDisabled, setDiseaseDisabled] = useState(true);

  const { data, diagnosisAssetsLoading } = useGetDiagnosisAssets(
    category?.value,
  );
  let diagnosisAssetsData = (function () {
    if (data.name) {
      return data.name.map(
        (item, index) => `${item} - ${data['ICD 10'].at(index)}`,
      );
    } else return data;
  })();

  const categoryOptions = createOptionsFromArray(diagnosisAssetsData);
  useEffect(
    function () {
      if (category) {
        if (data.name) setDiseaseDisabled(false);
        else setDiseaseDisabled(true);
      } else return;
    },
    [category, data.name],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectField
          id={id}
          field={field}
          isLoading={isLoading || diagnosisAssetsLoading}
          disabled={
            disabled || diagnosisAssetsLoading || category
              ? diseaseDisabled
              : null
          }
          options={categoryOptions}
          isSearchable={true}
          error={error}
        />
      )}
    />
  );
}

export default DiagnosisInput;
