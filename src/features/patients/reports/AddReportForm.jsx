import { useForm } from 'react-hook-form';

import { useSetNewReport } from './services/useSetNewReport';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import InputField from '../../../ui/InputField';
import Button from '../../../ui/Button';

function AddReportForm({ onCloseModal }) {
  const { setReportFn, setReportStatus } = useSetNewReport();
  const setReportLoading = setReportStatus === 'pending';

  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      body: '',
      report_result: '',
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    const newReportObj = new FormData();
    for (let key in data) {
      newReportObj.append(key, data[key]);
    }

    setReportFn(newReportObj);
    onCloseModal();
  }

  function onCancel() {
    onCloseModal();
  }

  return (
    <form className="h-full w-[80rem]" onSubmit={handleSubmit(onSubmit)}>
      <DataShowingLayout heading={'New Report'}>
        <div className="basis-full">
          <InputField
            type="text"
            id="Title"
            disabled={setReportLoading}
            register={register('title', {
              required: 'This Field is Required',
            })}
            error={errors?.title}
          />
        </div>
        <div className="flex w-full flex-col gap-[0.8rem]">
          <label
            className={`font-[500] capitalize ${errors && errors.body ? 'text-red-600' : ''}`}
            htmlFor={'body'}
          >
            Content{' '}
            {errors && errors.body ? (
              <span className="text-red-600">*</span>
            ) : (
              ''
            )}
          </label>
          <textarea
            id="body"
            disabled={setReportLoading}
            {...register('body', {
              required: 'This Field is Required',
            })}
            className={`rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm  ${errors && errors.body ? 'outline-red-600' : 'focus:outline-brand-700'} h-[20rem] resize-none`}
          ></textarea>
          {errors?.body?.message && (
            <span className="text-[1.4rem] text-red-700">
              {errors.body?.message}
            </span>
          )}
        </div>
      </DataShowingLayout>

      <div className="mr-4 space-x-4 pt-4 text-right">
        <Button
          type="button"
          onClick={onCancel}
          sort="secondary"
          disabled={setReportLoading}
        >
          Cancel
        </Button>
        <Button type="submit" sort="primary" disabled={setReportLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddReportForm;
