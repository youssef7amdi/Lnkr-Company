import { useForm, Controller } from 'react-hook-form';

import { createOptionsFromArray } from '../../../utils/createOptionsFromArray';

import { useGetAssets } from './services/useGetAssets';
import { useSetNewHistory } from './services/useSetNewHistory';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import InputField from '../../../ui/InputField';
import Button from '../../../ui/Button';
import SelectField from '../../../ui/SelectField';

function AddHistoryForm({ onCloseModal }) {
  const {
    data: { blood_type, marital_status },
    assetsLoading,
  } = useGetAssets();

  const bloodTypesOptions = createOptionsFromArray(blood_type);
  const maritalStatusOptions = createOptionsFromArray(marital_status);

  const { setHistoryFn, setHistoryStatus } = useSetNewHistory();
  const setHistoryLoading = setHistoryStatus === 'pending';

  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      smoking: checkBoxOptions.at(1),
      alcohol: checkBoxOptions.at(1),
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    const newHistoryObj = {
      chronic: data.chronic,
      blood_type: data.blood_type.value,
      marital_status: data.marital_status.value,
      food_allergy: data.food_allergy ? data.food_allergy : null,
      drug_allergy: data.drug_allergy ? data.drug_allergy : null,
      smoking: data.smoking.value ? true : null,
      alcohol: data.alcohol.value ? true : null,
    };
    setHistoryFn(newHistoryObj);
    onCloseModal();
  }

  function onCancel() {
    onCloseModal();
  }

  return (
    <form className=" h-full w-[80rem]" onSubmit={handleSubmit(onSubmit)}>
      <DataShowingLayout heading={'New History'}>
        <div className="basis-[40%]">
          <InputField
            type="text"
            id="Chronic"
            disabled={setHistoryLoading}
            register={register('chronic', {
              required: 'This Field is Required',
            })}
            error={errors?.chronic}
          />
        </div>

        <div className="basis-[40%]">
          <Controller
            name="blood_type"
            control={control}
            render={({ field }) => (
              <SelectField
                id="Blood Type"
                field={field}
                isLoading={assetsLoading}
                disabled={setHistoryLoading}
                options={bloodTypesOptions}
                error={errors?.blood_type}
              />
            )}
            rules={{
              required: 'this field is required',
            }}
          />
        </div>

        <div className="basis-[40%]">
          <Controller
            name="marital_status"
            control={control}
            render={({ field }) => (
              <SelectField
                id="Marital Status"
                field={field}
                isLoading={assetsLoading}
                disabled={setHistoryLoading}
                options={maritalStatusOptions}
                error={errors?.marital_status}
              />
            )}
            rules={{
              required: 'this field is required',
            }}
          />
        </div>

        <div className="basis-[40%]">
          <InputField
            type="text"
            id="Food Allergy"
            disabled={setHistoryLoading}
            register={register('food_allergy')}
          />
        </div>
        <div className="basis-[40%]">
          <InputField
            type="text"
            id="Drug Allergy"
            disabled={setHistoryLoading}
            register={register('drug_allergy')}
          />
        </div>
        <div className="basis-[15%]">
          <Controller
            name="smoking"
            control={control}
            render={({ field }) => (
              <SelectField
                id="Smoking"
                field={field}
                disabled={setHistoryLoading}
                options={checkBoxOptions}
              />
            )}
          />
        </div>
        <div className="basis-[15%]">
          <Controller
            name="alcohol"
            control={control}
            render={({ field }) => (
              <SelectField
                id="Alcohol"
                field={field}
                disabled={setHistoryLoading}
                options={checkBoxOptions}
              />
            )}
          />
        </div>
      </DataShowingLayout>

      <div className="mr-4 space-x-4 pt-4 text-right">
        <Button type="button" onClick={onCancel} sort="secondary">
          Cancel
        </Button>
        <Button type="submit" sort="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddHistoryForm;

var checkBoxOptions = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];
