import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import LabInput from './LabInput';

import Button from '../../../ui/Button';

function LabField({ control, errors, dirtyFields, watch, isSubmitting }) {
  const {
    fields: labFields,
    append: appendLab,
    remove: removeLab,
  } = useFieldArray({
    name: 'lab',
    control,
    rules: {
      minLength: 1,
    },
  });

  return (
    <>
      <h3 className="bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
        Lab:
      </h3>
      <div className="p grid grid-cols-[1fr_1fr_40px_40px] gap-[1.4rem] px-[1.8rem] py-[1rem]">
        {labFields.map((field, index) => (
          <Fragment key={field.id}>
            <LabInput
              disabled={isSubmitting}
              name={`lab.${index}.category_en`}
              control={control}
              id="Category"
              error={errors?.lab?.[index]?.category_en}
            />
            <LabInput
              name={`lab.${index}.name_en`}
              control={control}
              id="Name"
              category={watch(`lab.${index}.category_en`)}
              disabled={
                !dirtyFields[`lab.${index}.category_en`] || isSubmitting
              }
              error={errors?.lab?.[index]?.name_en}
            />
            <div className="self-end">
              <Button
                sort="warn"
                type="button"
                onClick={() => removeLab(index)}
                disabled={labFields.length == 1}
              >
                -
              </Button>
            </div>
            <div
              className={`${index === labFields.length - 1 ? 'hidden' : 'block'}`}
            ></div>
          </Fragment>
        ))}
        <div className="self-end">
          <Button
            type="button"
            sort="primary"
            onClick={() => appendLab()}
            disabled={isSubmitting}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

export default LabField;
