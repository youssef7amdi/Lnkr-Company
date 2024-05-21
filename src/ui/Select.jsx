function Select({ id, options, value, disabled, onChange, type }) {
  return (
    <div className="flex w-auto flex-col gap-[0.8rem]">
      {id && (
        <label className={`font-[500] capitalize `} htmlFor={id}>
          {id}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        className={`border px-[1.2rem] py-[0.8rem] text-[1.4rem] ${type == 'white' ? 'border-gray-100' : 'border-gray-300'} min-w-[22rem] cursor-pointer rounded-[7px] bg-white font-[500] shadow-sm`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
