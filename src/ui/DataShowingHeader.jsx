function DataShowingHeader({ icon, heading }) {
  return (
    <header className="flex items-center bg-brand-500 px-[4rem] py-[2rem] text-[1.8rem] font-[500] text-[#e0e7ff]">
      <div className="flex items-center gap-[1.6rem] text-[1.8rem] font-[600]">
        {icon && <>{icon}</>}
        <p>{heading}</p>
      </div>
    </header>
  );
}

export default DataShowingHeader;
