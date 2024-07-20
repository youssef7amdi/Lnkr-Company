import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRequestNewScan } from './services/useRequestNewScan';

import ScanField from './ScanField';

import InputField from '../../../ui/InputField';
import Button from '../../../ui/Button';

function RequestScanForm() {
  const { requestScanFn, requestScanStatus } = useRequestNewScan();
  const requestScanLoading = requestScanStatus === 'pending';
  const navigate = useNavigate();
  // useForm
  const { register, handleSubmit, control, formState, watch, reset } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      scan: [{}],
    },
  });

  const { errors, dirtyFields } = formState;

  function onSubmit(data) {
    const newScanObj = {
      general_comment: data.general_comment,
      requested_service: data.scan.map((item) => ({
        name_en: item.name_en.value,
        code: item.name_en.code,
        category_en: item.category_en.value,
      })),
    };
    requestScanFn(newScanObj, {
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
        Request New Scan
      </h2>
      <form className="my-[1.4rem] px-[1rem]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ScanField
            watch={watch}
            control={control}
            dirtyFields={dirtyFields}
            errors={errors}
            isSubmitting={requestScanLoading}
          />
          <h3 className="mt-[2.4rem] bg-brand-50 px-[1.4rem] py-[1rem] text-[1.8rem] font-bold text-brand-800">
            General Comment
          </h3>
          <div className="p gap-[1.4rem] px-[1.8rem] py-[1rem]">
            <InputField
              type="text"
              id="General Comment"
              isLoading={requestScanLoading}
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
            disabled={requestScanLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onReset}
            sort="warn"
            disabled={requestScanLoading}
          >
            Reset
          </Button>
          <Button type="submit" sort="primary" disabled={requestScanLoading}>
            Request
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestScanForm;
