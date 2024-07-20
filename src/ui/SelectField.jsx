import Select from 'react-select';

function SelectField({
  field,
  error,
  id,
  options,
  disabled = false,
  isSearchable = false,
  isLoading,
  defaultValue = null,
  children,
}) {
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
      <Select
        styles={{
          control: (baseStyle, state) => ({
            ...baseStyle,
            borderColor: error ? 'red' : { ...baseStyle.borderColor },
            ':hover': {
              borderColor: error ? 'red' : { ...baseStyle.borderColor },
            },
            boxShadow: state.isFocused
              ? error
                ? '0 0 0 1px red'
                : '0 0 0 1px #2684FF'
              : { ...baseStyle.boxShadow },
          }),
        }}
        isLoading={isLoading}
        id={id}
        options={options}
        isDisabled={disabled}
        isSearchable={isSearchable}
        defaultValue={defaultValue}
        className={`rounded-[7px] border-gray-300  shadow-sm  ${error ? 'outline-red-600' : 'focus:outline-brand-700'} `}
        {...field}
      />
      {error?.message && (
        <span className="text-[1.4rem] text-red-700">{error?.message}</span>
      )}
      {children}
    </div>
  );
}

export default SelectField;
