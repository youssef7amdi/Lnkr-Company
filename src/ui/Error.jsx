function Error({ children }) {
  return (
    <>
      <div className="min-w-[700px] rounded-lg bg-red-100 px-[2.4rem] py-[1.8rem] text-center text-[1.8rem] font-[600] text-red-700">
        {children}
      </div>
    </>
  );
}

export default Error;
