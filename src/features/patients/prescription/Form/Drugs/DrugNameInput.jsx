import { BASE_URL } from '../../../../../environment/environment';

import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import { useCookiesAccess } from '../../../../../contexts/CookiesAccessProvider';

function DrugNameInput({ index, control, isLoading, disabled, errors }) {
  const { getCookie } = useCookiesAccess();
  const accessToken = getCookie('access_token');

  function getOptions(inputValue, callback) {
    if (!inputValue || inputValue.length < 3) {
      return callback([]);
    }

    fetch(`${BASE_URL}assets/drug?q=${inputValue}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      response.json().then((data) => {
        const results = data.data;
        const general_name_options = results.map((item) => {
          return {
            label: item.general_name,
            value: item.general_name,
            ingredient: item.active_ingredient,
          };
        });

        callback(general_name_options);
      });
    });
  }
  return (
    <div className="flex flex-col justify-center gap-[0.5rem]">
      <Controller
        name={`prescribed_drug.${index}.drug_name`}
        control={control}
        render={({ field }) => (
          <AsyncSelect
            // unstyled
            className="w-full"
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                borderColor: errors?.prescribed_drug?.[index]?.drug_name
                  ? 'red'
                  : { ...baseStyle.borderColor },
                ':hover': {
                  borderColor: errors?.prescribed_drug?.[index]?.drug_name
                    ? 'red'
                    : { ...baseStyle.borderColor },
                },
                boxShadow: state.isFocused
                  ? errors?.prescribed_drug?.[index]?.drug_name
                    ? '0 0 0 1px red'
                    : '0 0 0 1px #2684FF'
                  : { ...baseStyle.boxShadow },
              }),
            }}
            cacheOptions
            defaultOptions
            {...field}
            isLoading={isLoading}
            isDisabled={disabled}
            loadOptions={getOptions}
          />
        )}
        rules={{
          required: 'Drug Name is Required',
        }}
      />
      {errors?.prescribed_drug?.[index]?.drug_name?.message && (
        <span className="text-[1.4rem] text-red-700">
          {errors?.prescribed_drug?.[index]?.drug_name?.message}
        </span>
      )}
    </div>
  );
}

export default DrugNameInput;
