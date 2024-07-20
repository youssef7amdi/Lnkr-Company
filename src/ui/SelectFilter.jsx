import Select from 'react-select';

function SelectFilter({ id, options, value, disabled, onChange, type }) {
  return (
    <div className="flex w-auto flex-col gap-[0.8rem]">
      {id && (
        <label className={`font-[500] capitalize `} htmlFor={id}>
          {id}
        </label>
      )}
      <Select
        defaultValue={value}
        onChange={onChange}
        options={options}
        id={id}
        isDisabled={disabled}
        className={`text-[1.4rem] ${type == 'white' ? 'border-gray-100' : 'border-gray-300'} min-w-[22rem] cursor-pointer rounded-[7px] bg-white font-[500] shadow-sm outline-none`}
      />
    </div>
  );
}

export default SelectFilter;
