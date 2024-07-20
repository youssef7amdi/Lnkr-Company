function ClinicCheckbox({ clinic, active, disabled, onClick }) {
  return (
    <div
      key={clinic}
      role="button"
      onClick={onClick}
      className={`group relative flex h-[12rem] w-[20rem] items-center justify-center rounded-[7px] border  p-[2.4rem] text-center text-[1.4rem] font-[500] hover:border-brand-700  hover:text-brand-700 disabled:cursor-not-allowed ${active ? 'border-brand-700 text-brand-700' : 'border-gray-400 text-black'}`}
      disabled={disabled}
    >
      {clinic}
      <span
        className={`absolute left-4 top-4 h-4 w-4 rounded-full outline outline-2 outline-offset-2 group-hover:bg-brand-700 group-hover:outline-brand-700 ${active ? 'bg-brand-700 outline-brand-700' : 'bg-none outline-gray-400'}`}
      ></span>
    </div>
  );
}

export default ClinicCheckbox;
