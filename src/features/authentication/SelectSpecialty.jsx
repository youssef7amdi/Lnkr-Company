import { useSpecialtyList } from './services/useSpecialtyList';

import SpinnerMini from '../../ui/SpinnerMini';

function SelectSpecialty({ register, disabled = false, id, error }) {
  const { data, isLoading } = useSpecialtyList();

  const specialties = data.map((specialty) => {
    return { label: specialty, value: specialty };
  });

  return (
    <div className="flex w-full flex-col gap-[0.8rem]">
      {id && (
        <label
          className={`font-[500] capitalize ${error ? 'text-red-600' : ''}`}
          htmlFor={id}
        >
          {id} {error ? <span className="text-red-600">*</span> : ''}
        </label>
      )}
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <select
          {...register}
          disabled={disabled}
          id={id}
          defaultValue={''}
          className={`rounded-[7px] border-r-8 border-transparent px-[1.2rem] py-[0.8rem] shadow-sm outline outline-gray-300  ${error ? 'outline-red-600' : 'focus:outline-brand-700'} `}
        >
          <option value="">Select</option>
          {specialties.map((specialty) => (
            <option value={specialty.value} key={specialty.value}>
              {specialty.value}
            </option>
          ))}
        </select>
      )}
      {error?.message && (
        <span className="text-[1.4rem] text-red-700">{error?.message}</span>
      )}
    </div>
  );
}

export default SelectSpecialty;
