function InputField({
  register,
  error,
  id,
  min,
  type,
  placeholder,
  disabled,
  step = null,
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
      <input
        id={id}
        type={type}
        disabled={disabled}
        min={min}
        step={step}
        placeholder={placeholder}
        className={`rounded-[7px] border border-gray-300 px-[1.2rem] py-[0.8rem] shadow-sm  ${error ? 'outline-red-600' : 'focus:outline-brand-700'} `}
        {...register}
      />
      {error?.message && (
        <span className="text-[1.4rem] text-red-700">{error?.message}</span>
      )}
      {children}
    </div>
  );
}

export default InputField;
