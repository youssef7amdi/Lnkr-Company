import Logo from './Logo';

function RegistrationLayout({ pageHeading, children }) {
  return (
    <div className="grid h-screen  content-center justify-center gap-[3.2rem] bg-gray-50 pb-40 ">
      <Logo />
      <h1 className="text-center text-[3rem] font-[600] leading-[1.4]">
        {pageHeading}
      </h1>
      <div className="min-w-[50rem] overflow-auto rounded-[10px] border border-gray-100 bg-white px-[4rem] py-[2.4rem] text-[1.4rem]">
        {children}
      </div>
    </div>
  );
}

export default RegistrationLayout;
