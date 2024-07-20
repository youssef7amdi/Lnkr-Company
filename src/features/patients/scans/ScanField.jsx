import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import ScanInput from './ScanInput';

import Button from '../../../ui/Button';

function ScanField({ control, errors, dirtyFields, watch, isSubmitting }) {
  const {
    fields: scanFields,
    append: appendScan,
    remove: removeScan,
  } = useFieldArray({
    name: 'scan',
    control,
    rules: {
      minLength: 1,
    },
  });

  return (
    <>
      <h3 className="bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
        Scan:
      </h3>
      <div className="p grid grid-cols-[1fr_1fr_40px_40px] gap-[1.4rem] px-[1.8rem] py-[1rem]">
        {scanFields.map((field, index) => (
          <Fragment key={field.id}>
            <ScanInput
              disabled={isSubmitting}
              name={`scan.${index}.category_en`}
              control={control}
              id="Category"
              error={errors?.scan?.[index]?.category_en}
            />
            <ScanInput
              name={`scan.${index}.name_en`}
              control={control}
              id="Name"
              category={watch(`scan.${index}.category_en`)}
              disabled={
                !dirtyFields[`scan.${index}.category_en`] || isSubmitting
              }
              error={errors?.scan?.[index]?.name_en}
            />
            <div className="self-end">
              <Button
                sort="warn"
                type="button"
                onClick={() => removeScan(index)}
                disabled={scanFields.length == 1}
              >
                -
              </Button>
            </div>
            <div
              className={`${index === scanFields.length - 1 ? 'hidden' : 'block'}`}
            ></div>
          </Fragment>
        ))}
        <div className="self-end">
          <Button
            type="button"
            sort="primary"
            onClick={() => appendScan()}
            disabled={isSubmitting}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

export default ScanField;
