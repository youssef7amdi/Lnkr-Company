import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import DrugNameInput from './DrugNameInput';
import DirectionsInput from './DirectionsInput';

import Button from '../../../../../ui/Button';
import InputField from '../../../../../ui/InputField';

function DrugField({ control, errors, register, isSubmitting }) {
  const {
    fields: drugFields,
    append: appendDrug,
    remove: removeDrug,
  } = useFieldArray({
    name: 'prescribed_drug',
    control,
    rules: {
      minLength: 1,
    },
  });

  return (
    <>
      <h3 className="mt-[2.4rem] bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
        Drugs:
      </h3>
      <div className="p grid grid-cols-[70px_1.5fr_2.5fr_40px_40px] gap-[1.4rem] px-[1.8rem] py-[1rem] text-[1.2rem]">
        <span className="">Quantity*</span>
        <span>Drug Name *</span>
        <div className="flex items-center gap-[0.5rem]">
          <span className="w-[70px]">Dose*</span>
          <span className="basis-[10px]"></span>
          <span className="w-[70px]">Frequency*</span>
          <span className="basis-[28px]"></span>
          <span className="grow">Frequency choice*</span>
          <span className="basis-[28px]"></span>
          <span className="w-[70px]">Duration*</span>
          <span className="grow">Duration Choice*</span>
        </div>
        <span></span>
        <span></span>
      </div>
      <div className="p grid grid-cols-[70px_1.5fr_2.5fr_40px_40px] gap-[1.4rem] px-[1.8rem] pb-[1rem]">
        {drugFields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="w-[70px]">
              <InputField
                type="number"
                min={1}
                disabled={isSubmitting}
                register={register(`prescribed_drug.${index}.quantity`, {
                  required: true,
                  min: 1,
                })}
                error={errors?.prescribed_drug?.[index]?.quantity}
              />
            </div>
            <DrugNameInput
              control={control}
              index={index}
              disabled={isSubmitting}
              errors={errors}
            />
            <DirectionsInput
              control={control}
              errors={errors}
              disabled={isSubmitting}
              index={index}
              register={register}
            />

            <Button
              sort="warn"
              type="button"
              onClick={() => removeDrug(index)}
              disabled={drugFields.length == 1}
            >
              -
            </Button>
            <div
              className={`${index === drugFields.length - 1 ? 'hidden' : 'block'}`}
            ></div>
          </Fragment>
        ))}
        <div className="self-end">
          <Button
            type="button"
            sort="primary"
            disabled={isSubmitting}
            onClick={() =>
              appendDrug({
                dose: 1,
                frequency_num: 1,
                duration_num: 1,
                quantity: 1,
              })
            }
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

export default DrugField;
