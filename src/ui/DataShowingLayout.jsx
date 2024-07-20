import DataShowingHeader from './DataShowingHeader';

function DataShowingLayout({
  headingIcon,
  heading,
  highlightIcon,
  highlightLabel,
  highlightValue,
  footer,
  children,
}) {
  return (
    <section className="border-radius self-stretch rounded-[7px] border border-gray-100 bg-white">
      <DataShowingHeader icon={headingIcon} heading={heading} />
      <main className="px-[4rem] pb-[1.2rem] pt-[3.2rem]">
        <div className="mb-[1.6rem] flex flex-wrap  gap-[1.2rem] text-gray-500">
          {children}
        </div>
        {highlightLabel && (
          <div className="mt-[2.4rem] flex items-center rounded-[5px] bg-green-100 px-[3.2rem] py-[1.6rem] text-green-700">
            <div className="flex items-center gap-[0.8rem] py-[0.8rem] font-[600]">
              {highlightIcon}
              <span className="ml-[0.8rem]">
                {highlightLabel}:
                <span className="ml-3 font-[400] capitalize">
                  {highlightValue}
                </span>
              </span>
            </div>
          </div>
        )}
      </main>
      {footer && (
        <footer className="px-[4rem] py-[1.6rem] text-right text-[1.2rem] text-gray-500">
          <p>{footer}</p>
        </footer>
      )}
    </section>
  );
}

export default DataShowingLayout;
