function DataShowingHeader({ icon, heading }) {
  return (
    <header className="flex items-center bg-brand-500 px-[4rem] py-[2rem] text-[1.8rem] font-[500] text-white">
      {icon && <>{icon}</>}
      <div className="w-full">{heading}</div>
    </header>
  );
}

export default DataShowingHeader;
