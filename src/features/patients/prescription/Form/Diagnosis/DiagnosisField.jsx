import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import DiagnosisInput from './DiagnosisInput';

import Button from '../../../../../ui/Button';

function DiagnosisField({ control, errors, dirtyFields, watch, isSubmitting }) {
  const {
    fields: diagnosisFields,
    append: appendDiagnosis,
    remove: removeDiagnosis,
  } = useFieldArray({
    name: 'diagnosis',
    control,
    rules: {
      minLength: 1,
    },
  });
  return (
    <>
      <h3 className="bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
        Diagnosis:
      </h3>
      <div className="p grid grid-cols-[1fr_1fr_40px_40px] gap-[1.4rem] px-[1.8rem] py-[1rem]">
        {diagnosisFields.map((field, index) => (
          <Fragment key={field.id}>
            <DiagnosisInput
              disabled={isSubmitting}
              name={`diagnosis.${index}.general_diagnosis`}
              control={control}
              id="Category"
              error={errors?.diagnosis?.[index]?.general_diagnosis}
            />
            <DiagnosisInput
              name={`diagnosis.${index}.detailed_diagnosis`}
              control={control}
              id="Disease"
              category={watch(`diagnosis.${index}.general_diagnosis`)}
              disabled={
                !dirtyFields[`diagnosis.${index}.general_diagnosis`] ||
                isSubmitting
              }
              error={errors?.diagnosis?.[index]?.detailed_diagnosis}
            />
            <div className="self-end">
              <Button
                sort="warn"
                type="button"
                onClick={() => removeDiagnosis(index)}
                disabled={diagnosisFields.length == 1}
              >
                -
              </Button>
            </div>
            <div
              className={`${index === diagnosisFields.length - 1 ? 'hidden' : 'block'}`}
            ></div>
          </Fragment>
        ))}
        <div className="self-end">
          <Button
            type="button"
            sort="primary"
            onClick={() => appendDiagnosis()}
            disabled={isSubmitting}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

export default DiagnosisField;
