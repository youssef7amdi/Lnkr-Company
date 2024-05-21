function Button({ type, onClick, sort, children, disabled = false, active }) {
  const buttonClass = {
    primary:
      'bg-brand-500 text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200 px-6  py-3 mx-auto w-fit',
    secondary: 'hover:bg-gray-100 px-6  py-3 mx-auto w-fit',
    warn: 'border-2 border-red-500 hover:bg-red-500 hover:text-white px-6  py-3 mx-auto w-fit disabled:bg-red-100 disabled:cursor-not-allowed disabled:text-black',
    filterButton: `bg-white py-[0.44rem] px-[0.8rem] hover:bg-brand-600 hover:text-brand-50 disabled:cursor-not-allowed mx-auto w-fit ${active ? 'bg-brand-600 text-brand-50' : ''} disabled:bg-brand-600`,
    registration: `bg-brand-600 hover:bg-brand-700 text-white disabled:cursor-not-allowed disabled:bg-brand-500 py-5 px-8`,
    paginationButton: `border-none flex items-center justify-center gap-[0.4] has-[span:last-child]:pr-[1.2rem] has-[span:last-child]:pl-[0.4rem] has-[span:first-child]:pr-[0.4rem] has-[span:first-child]:pl-[1.2rem] py-[0.6rem] hover:bg-brand-600 hover:text-brand-50 ${active ? 'bg-brand-600 text-brand-50' : 'bg-gray-50 text-inherit'} disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed`,
  };

  return (
    <button
      className={` rounded-[7px] text-[1.4rem] font-[500] ${buttonClass[sort]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
