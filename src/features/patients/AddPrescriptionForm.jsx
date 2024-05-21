import { useFieldArray, useForm } from 'react-hook-form';
import DataShowingLayout from '../../ui/DataShowingLayout';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';

function AddPrescriptionForm({ onCloseModal }) {
  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onSubmit',
  });

  const {
    fields: drugFields,
    append,
    remove,
  } = useFieldArray({
    name: 'prescribedDrug',
    control,
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    onCloseModal();
  }

  function onCancel() {
    onCloseModal();
  }

  return (
    <form className=" w-[90rem]" onSubmit={handleSubmit(onSubmit)}>
      <DataShowingLayout heading={'Diagnosis'}>
        <div className="basis-[48%]">
          <InputField
            type="text"
            id="General Diagnosis"
            register={register('generalDiagnosis', {
              required: 'This Field is Required',
            })}
            error={errors?.generalDiagnosis}
          />
        </div>

        <div className="basis-[48%]">
          <InputField
            type="text"
            id="Detailed Diagnosis"
            register={register('detailedDiagnosis', {
              required: 'This Field is Required',
            })}
            error={errors?.detailedDiagnosis}
          />
        </div>

        <div className="basis-[48%]">
          <InputField
            type="text"
            id="General Condition"
            register={register('generalCondition', {
              required: 'This Field is Required',
            })}
            error={errors?.generalCondition}
          />
        </div>
      </DataShowingLayout>
      <DataShowingLayout heading="Prescribed Drugs">
        {drugFields.length > 0 && (
          <header className="grid basis-full grid-cols-[0.29fr_0.29fr_0.19fr_0.1fr_7px] items-center gap-[0.6rem] text-[1.4rem] font-[600]">
            <div>Name</div>
            <div>Active Ingredient</div>
            <div>Directions</div>
            <div>Quantity</div>
          </header>
        )}
        {drugFields.map((field, index) => (
          <div
            key={field.id}
            className="grid basis-full grid-cols-[0.29fr_0.29fr_0.19fr_0.1fr_7px] items-center gap-[0.6rem] overflow-auto"
          >
            <div className="">
              <InputField
                register={register(`prescribedDrug.${index}.name`, {
                  required: true,
                })}
                error={errors?.prescribedDrug?.[index].name}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                register={register(`prescribedDrug.${index}.activeIngredient`, {
                  required: true,
                })}
                error={errors?.prescribedDrug?.[index].activeIngredient}
              />
            </div>
            <div className="max-w-[150px]">
              <InputField
                type="text"
                register={register(`prescribedDrug.${index}.directions`, {
                  required: true,
                })}
                error={errors?.prescribedDrug?.[index].directions}
              />
            </div>
            <div className="max-w-[100px]">
              <InputField
                type="number"
                register={register(`prescribedDrug.${index}.quantity`, {
                  required: true,
                  min: {
                    value: 1,
                  },
                })}
                error={errors?.prescribedDrug?.[index].quantity}
              />
            </div>
            <div className="self-end">
              <Button
                sort="warn"
                type="button"
                onClick={() => remove(index)}
                disabled={drugFields.length == 1}
              >
                -
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          sort="primary"
          onClick={() =>
            append({
              name: '',
              activeIngredient: '',
              directions: '',
              quantity: '',
            })
          }
        >
          Add Drug
        </Button>
      </DataShowingLayout>
      <DataShowingLayout heading="General Comment">
        <div className="basis-[48%]">
          <InputField
            type="text"
            id="General Comment"
            register={register('generalComment', {
              required: 'This Field is Required',
            })}
            error={errors?.generalComment}
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

export default AddPrescriptionForm;
