import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useSetNewPrescription } from '../services/useSetNewPrescription';

import DiagnosisField from './Diagnosis/DiagnosisField';
import DrugField from './Drugs/DrugField';

import InputField from '../../../../ui/InputField';
import Button from '../../../../ui/Button';

function AddPrescriptionForm() {
  const { setPrescriptionFn, setPrescriptionStatus } = useSetNewPrescription();
  const setPrescriptionLoading = setPrescriptionStatus === 'pending';
  const navigate = useNavigate();
  // useForm
  const { register, handleSubmit, control, formState, watch, reset } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      diagnosis: [
        { general_diagnosis: null, detailed_diagnosis: null, icd: null },
      ],
      prescribed_drug: [
        {
          dose: 1,
          frequency_num: 1,
          duration_num: 1,
          quantity: 1,
        },
      ],
    },
  });

  const { errors, dirtyFields } = formState;

  function onSubmit(data) {
    const prescriptionObj = {
      diagnosis: data.diagnosis.at(0).general_diagnosis
        ? data.diagnosis.map((item) => {
            return {
              general_diagnosis: item.general_diagnosis?.value,
              detailed_diagnosis: item.detailed_diagnosis?.value
                .split(' - ')
                .at(0),
              icd: item.detailed_diagnosis?.value.split(' - ').at(1),
            };
          })
        : [],
      disease: '',
      general_comment: data?.general_comment,
      prescribed_drug: data.prescribed_drug.map((drug) => {
        return {
          general_name: drug.drug_name.value,
          active_ingredient: drug.drug_name.ingredient,
          dose: Number(drug.dose),
          frequency_num: Number(drug.frequency_num),
          frequency_choice: drug.frequency_choice.value,
          duration_num: Number(drug.duration_num),
          duration_choice: drug.duration_choice.value,
          quantity: Number(drug.quantity),
        };
      }),
    };

    setPrescriptionFn(prescriptionObj, {
      onSuccess: () => navigate(-1),
    });
  }

  function onReset() {
    reset();
  }

  function onCancel() {
    navigate(-1);
  }

  return (
    <div className="w-full rounded-[7px] bg-white px-[2.4rem] py-[1.5rem] shadow-sm">
      <h2 className="text-center text-[2.5rem] font-semibold text-gray-800">
        Add New Prescription
      </h2>
      <form className="my-[1.4rem] px-[1rem]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <DiagnosisField
            watch={watch}
            control={control}
            dirtyFields={dirtyFields}
            errors={errors}
            isSubmitting={setPrescriptionLoading}
          />
          <DrugField
            register={register}
            control={control}
            errors={errors}
            isSubmitting={setPrescriptionLoading}
          />
          <h3 className="mt-[2.4rem] bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
            General Comment
          </h3>
          <div className="p gap-[1.4rem] px-[1.8rem] py-[1rem]">
            <InputField
              type="text"
              id="General Comment"
              isLoading={setPrescriptionLoading}
              register={register('general_comment')}
              error={errors?.general_comment}
            />
          </div>
        </div>
        <div className="mr-4 space-x-4 pt-4 text-right">
          <Button
            type="button"
            onClick={onCancel}
            sort="secondary"
            disabled={setPrescriptionLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onReset}
            sort="warn"
            disabled={setPrescriptionLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            sort="primary"
            disabled={setPrescriptionLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPrescriptionForm;
