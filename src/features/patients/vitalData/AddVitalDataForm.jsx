import { useForm } from 'react-hook-form';

import { useSetNewVitals } from './services/useSetNewVitals';

import DataShowingLayout from '../../../ui/DataShowingLayout';
import InputField from '../../../ui/InputField';
import Button from '../../../ui/Button';

function AddVitalDataForm({ onCloseModal }) {
  const { setVitalsFn, setVitalsStatus } = useSetNewVitals();
  const setVitalsLoading = setVitalsStatus === 'pending';

  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
  });

  const { errors } = formState;

  function onSubmit(data) {
    const newVitalsObj = {
      weight: Number(data.weight),
      height: Number(data.height),
      blood_pressure: data.blood_pressure ? data.blood_pressure : null,
      sugar_level: data.sugar_level ? data.sugar_level : null,
      temperature: data.temperature ? data.temperature : null,
      oxygen_saturation: data.oxygen_saturation ? data.oxygen_saturation : null,
      race: data.race ? data.race : null,
      pulse: data.pulse ? data.pulse : null,
      other: data.other ? data.other : null,
    };
    console.log(newVitalsObj);
    setVitalsFn(newVitalsObj);
    onCloseModal();
  }

  function onCancel() {
    onCloseModal();
  }

  return (
    <form className=" h-full w-[80rem]" onSubmit={handleSubmit(onSubmit)}>
      <DataShowingLayout heading={'New History'}>
        <div className="basis-[10%]">
          <InputField
            type="number"
            id="Weight"
            step={0.01}
            disabled={setVitalsLoading}
            register={register('weight', {
              required: 'This Field is Required',
            })}
            error={errors?.weight}
          />
        </div>

        <div className="basis-[10%]">
          <InputField
            type="number"
            id="Height"
            step={0.01}
            disabled={setVitalsLoading}
            register={register('height', {
              required: 'This Field is Required',
            })}
            error={errors?.height}
          />
        </div>

        <div className="basis-[30%]">
          <InputField
            type="text"
            id="Blood Pressure"
            disabled={setVitalsLoading}
            register={register('blood_pressure')}
          />
        </div>

        <div className="basis-[30%]">
          <InputField
            type="text"
            id="Sugar Level"
            disabled={setVitalsLoading}
            register={register('sugar_level')}
          />
        </div>

        <div className="basis-[20%]">
          <InputField
            type="text"
            id="Temperature"
            disabled={setVitalsLoading}
            register={register('temperature')}
          />
        </div>

        <div className="basis-[30%]">
          <InputField
            type="text"
            id="Oxygen Saturation"
            disabled={setVitalsLoading}
            register={register('oxygen_saturation')}
          />
        </div>
        <div className="basis-[5%]">
          <InputField
            type="text"
            id="Race"
            disabled={setVitalsLoading}
            register={register('race')}
          />
        </div>
        <div className="basis-[5%]">
          <InputField
            type="text"
            id="pulse"
            disabled={setVitalsLoading}
            register={register('pulse')}
          />
        </div>
        <div className="basis-[30%]">
          <InputField
            type="text"
            id="other"
            disabled={setVitalsLoading}
            register={register('other')}
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

export default AddVitalDataForm;
