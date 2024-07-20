import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRequestNewLab } from './services/useRequestNewLab';

import LabField from './LabField';

import InputField from '../../../ui/InputField';
import Button from '../../../ui/Button';

function RequestLabForm() {
  const { requestLabFn, requestLabStatus } = useRequestNewLab();
  const requestLabLoading = requestLabStatus === 'pending';
  const navigate = useNavigate();
  // useForm
  const { register, handleSubmit, control, formState, watch, reset } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      lab: [{}],
    },
  });

  const { errors, dirtyFields } = formState;

  function onSubmit(data) {
    const newLabObj = {
      general_comment: data.general_comment,
      requested_service: data.lab.map((item) => ({
        name_en: item.name_en.value,
        code: item.name_en.code,
        category_en: item.category_en.value,
      })),
    };
    requestLabFn(newLabObj, {
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
        Request New Lab
      </h2>
      <form className="my-[1.4rem] px-[1rem]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <LabField
            watch={watch}
            control={control}
            dirtyFields={dirtyFields}
            errors={errors}
            isSubmitting={requestLabLoading}
          />
          <h3 className="mt-[2.4rem] bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
            General Comment
          </h3>
          <div className="p gap-[1.4rem] px-[1.8rem] py-[1rem]">
            <InputField
              type="text"
              id="General Comment"
              isLoading={requestLabLoading}
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
            disabled={requestLabLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onReset}
            sort="warn"
            disabled={requestLabLoading}
          >
            Reset
          </Button>
          <Button type="submit" sort="primary" disabled={requestLabLoading}>
            Request
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestLabForm;
